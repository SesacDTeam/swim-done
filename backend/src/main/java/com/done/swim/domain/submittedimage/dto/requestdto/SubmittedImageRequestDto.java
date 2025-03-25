package com.done.swim.domain.submittedimage.dto.requestdto;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.user.entity.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmittedImageRequestDto {
    private Pool pool;
    private User user;
    private MultipartFile file;
}
