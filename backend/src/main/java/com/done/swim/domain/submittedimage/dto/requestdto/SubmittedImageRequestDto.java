package com.done.swim.domain.submittedimage.dto.requestdto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.submittedimage.entity.SubmittedImage;
import com.done.swim.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 * 이미지 생성
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmittedImageRequestDto {
    private Pool pool;
    private User user;
    private MultipartFile file;

    public SubmittedImage toEntity(Map<String, String> imageInfo) {
        String imageUrl = imageInfo.get("imageUrl");
        String s3Key = imageInfo.get("s3Key");

        return SubmittedImage.builder()
                .pool(this.pool)
                .user(this.user)
                .imageUrl(imageUrl)
                .originalName(this.file.getOriginalFilename())
                .s3Key(s3Key)
                .build();
    }
}
