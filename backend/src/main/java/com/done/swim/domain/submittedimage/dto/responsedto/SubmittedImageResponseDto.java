package com.done.swim.domain.submittedimage.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.submittedimage.entity.SubmittedImage;
import com.done.swim.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmittedImageResponseDto {
    private Long id;
    private Pool pool;
    private User user;
    private String imageUrl;
    private String originalName;

    public static SubmittedImageResponseDto from(SubmittedImage submittedImage) {

        return SubmittedImageResponseDto.builder()
                .id(submittedImage.getId())
                .pool(submittedImage.getPool())
                .user(submittedImage.getUser())
                .imageUrl(submittedImage.getImageUrl())
                .originalName(submittedImage.getOriginalName())
                .build();
    }
}
