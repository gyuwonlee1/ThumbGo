-- ================================================
-- Supabase Storage: thumbnails 버킷 생성 + RLS 정책
-- Supabase Dashboard > SQL Editor 에서 실행하세요
-- ================================================

-- 1. thumbnails 버킷 생성 (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'thumbnails',
  'thumbnails',
  true,
  2097152,  -- 2MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. 누구나 썸네일 읽기 허용 (public 버킷)
CREATE POLICY "Allow public read thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'thumbnails');

-- 3. 누구나 썸네일 업로드 허용 (개발 단계)
CREATE POLICY "Allow public insert thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'thumbnails');

-- 4. 누구나 썸네일 업데이트 허용 (upsert 지원)
CREATE POLICY "Allow public update thumbnails"
ON storage.objects FOR UPDATE
USING (bucket_id = 'thumbnails');
