package com.done.swim.domain.submittedimage.repository;

import com.done.swim.domain.submittedimage.entity.SubmittedImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmittedImageRepository extends JpaRepository<SubmittedImage, Long> {
}
