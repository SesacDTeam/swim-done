package com.done.swim.domain.submittedimage.controller;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.submittedimage.dto.requestdto.SubmittedImageRequestDto;
import com.done.swim.domain.submittedimage.dto.responsedto.SubmittedImageResponseDto;
import com.done.swim.domain.submittedimage.service.SubmittedImageService;
import com.done.swim.domain.user.entity.User;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class SubmittedImageController {

    private final SubmittedImageService submittedImageService;
    private final PoolRepository poolRepository;

    /**
     * 단건 이미지 저장
     *
     * @param poolId 수영장 식별 아이디
     * @param user   유저
     * @param file   이미지
     */
    @PostMapping
    public SubmittedImageResponseDto createImage(
            @RequestParam("poolId") Long poolId,
            @AuthenticationPrincipal User user,
            @RequestPart("file") MultipartFile file) {

        Pool pool = poolRepository.findById(poolId)
                .orElseThrow(() -> new GlobalException(ErrorCode.POOL_NOT_FOUND));

        SubmittedImageRequestDto requestDto = SubmittedImageRequestDto.builder()
                .pool(pool)
                .user(user)
                .file(file)
                .build();

        return submittedImageService.createImage(requestDto);
    }

    /**
     * 특정 이미지 조회
     *
     * @param id 이미지 아이디
     */
    @GetMapping("/{id}")
    public SubmittedImageResponseDto getImageById(@PathVariable Long id) {
        return submittedImageService.getImageById(id);
    }

    /**
     * 모든 이미지 조회
     */
    @GetMapping
    public List<SubmittedImageResponseDto> getImages() {
        return submittedImageService.getImages();
    }

    /**
     * 특정 이미지 삭제
     *
     * @param id 이미지 아이디
     */
    @DeleteMapping("/{id}")
    public void deleteImage(@PathVariable Long id) {
        submittedImageService.deleteImage(id);
    }
}
