package com.done.swim.global.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {

    // AWS S3 서비스와 상호작용하기 위한 클라이언트
    private final S3Client s3Client;

    // S3에 저장되는 파일의 기본 경로
    private final String FILE_PATH_PREFIX = "submittedImage/";

    // Image URL 형식 (%s: 버킷명, 리전, 파일경로가 순서대로 들어감)
    private final String IMAGE_URL_FORMAT = "https://%s.s3.%s.amazonaws.com/%s";

    // S3 버킷 이름
    @Value("${BUCKET_NAME}")
    private String bucketName;

    // AWS 리전
    @Value("${REGION}")
    private String region;

    // 이미지 파일 S3에 업로드하고 URL과 객체 키 반환
    public Map<String, String> uploadImage(MultipartFile file) {

        // 파일 객체 키 생성
        String s3Key = FILE_PATH_PREFIX + UUID.randomUUID() + "_" + file.getOriginalFilename();

        // file을 s3Key 경로에 업로드
        uploadImageToS3(file, s3Key);

        // 접근 가능한 URL 생성
        String imageUrl = String.format(IMAGE_URL_FORMAT, bucketName, region, s3Key);

        // URL과 키를 Map으로 반환
        return Map.of(
                "imageUrl", imageUrl,
                "s3Key", s3Key
        );
    }

    // 이미지 파일 S3 버킷에 업로드
    private void uploadImageToS3(MultipartFile file, String s3Key) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();

            s3Client.putObject(putObjectRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize());
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 실패: " + e.getMessage());
        }
    }

    // S3 객체 삭제
    public void deleteFile(String s3Key) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
        } catch (Exception e) {
            throw new RuntimeException("파일 삭제 실패: " + e.getMessage());
        }
    }

}
