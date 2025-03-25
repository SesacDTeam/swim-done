package com.done.swim.domain.submittedimage.controller;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.submittedimage.dto.requestdto.SubmittedImageRequestDto;
import com.done.swim.domain.submittedimage.dto.responsedto.SubmittedImageResponseDto;
import com.done.swim.domain.submittedimage.service.SubmittedImageService;
import com.done.swim.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class SubmittedImageController {

    private final SubmittedImageService submittedImageService;

    public SubmittedImageResponseDto createImage(
            @RequestPart("pool") Pool pool,
            @RequestPart("user") User user,
            @RequestPart("file") MultipartFile file) {

        SubmittedImageRequestDto requestDto = SubmittedImageRequestDto.builder()
                .pool(pool)
                .user(user)
                .file(file)
                .build();

        return submittedImageService.createImage(requestDto);
    }

    @GetMapping("/${id}")
    public SubmittedImageResponseDto getImageById(@PathVariable Long id) {
        return submittedImageService.getImageById(id);
    }

    @GetMapping
    public List<SubmittedImageResponseDto> getImages() {
        return submittedImageService.getImages();
    }

    @DeleteMapping("/{id}")
    public void deleteImage(Long id) {
        submittedImageService.deleteImage(id);
    }

}
