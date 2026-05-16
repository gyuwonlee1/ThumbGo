import { supabase } from "./supabase";

const BUCKET = "thumbnails";

/**
 * 썸네일 이미지를 Supabase Storage에 업로드하고 public URL을 반환합니다.
 *
 * @param file - 업로드할 이미지 File 객체
 * @param testId - 테스트 ID (폴더 구분용)
 * @param label - 썸네일 라벨 (A, B, C, D)
 * @returns public URL 문자열
 */
export async function uploadThumbnail(
  file: File,
  testId: string,
  label: string
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${testId}/${label}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });

  if (error) {
    throw new Error(`썸네일 업로드 실패 (${label}): ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path);

  return urlData.publicUrl;
}
