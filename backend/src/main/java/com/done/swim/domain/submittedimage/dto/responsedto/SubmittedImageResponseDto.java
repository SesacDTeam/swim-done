package com.done.swim.domain.submittedimage.dto.responsedto;

import com.done.swim.domain.submittedimage.entity.SubmittedImage;
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
    private Long poolId;
    private Long userId;
    private String imageUrl;
    private String originalName;

    public static SubmittedImageResponseDto from(SubmittedImage submittedImage) {

        return SubmittedImageResponseDto.builder()
                .id(submittedImage.getId())
                .poolId(submittedImage.getPool().getId())
                .userId(submittedImage.getUser().getId())
                .imageUrl(submittedImage.getImageUrl())
                .originalName(submittedImage.getOriginalName())
                .build();
    }
}
