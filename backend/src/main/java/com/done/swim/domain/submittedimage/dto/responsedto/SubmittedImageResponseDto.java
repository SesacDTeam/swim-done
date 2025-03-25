package com.done.swim.domain.submittedimage.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.user.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmittedImageResponseDto {
    private Long id;
    private Pool pool;
    private User user;
    private String imageUrl;
    private String originalName;

}
