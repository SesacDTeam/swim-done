package com.done.swim.domain.submittedimage.service;

import com.done.swim.domain.submittedimage.dto.requestdto.SubmittedImageRequestDto;
import com.done.swim.domain.submittedimage.dto.responsedto.SubmittedImageResponseDto;
import com.done.swim.domain.submittedimage.entity.SubmittedImage;
import com.done.swim.domain.submittedimage.repository.SubmittedImageRepository;
import com.done.swim.global.awss3.AwsS3Service;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SubmittedImageService {

    private final SubmittedImageRepository submittedImageRepository;
    private final AwsS3Service awsS3Service;

    // 제보한 이미지 생성
    @Transactional
    public SubmittedImageResponseDto createImage(SubmittedImageRequestDto requestDto) {
        Map<String, String> uploadResult = awsS3Service.uploadImage(requestDto.getFile());

        String imageUrl = uploadResult.get("imageUrl");
        String s3Key = uploadResult.get("s3Key");

        SubmittedImage submittedImage = SubmittedImage.builder()
                .pool(requestDto.getPool())
                .user(requestDto.getUser())
                .imageUrl(imageUrl)
                .originalName(requestDto.getFile().getOriginalFilename())
                .s3Key(s3Key)
                .build();

        SubmittedImage savedSubmittedImage = submittedImageRepository.save(submittedImage);

        return toResponseDto(savedSubmittedImage);

    }

    // 제보한 이미지 조회
    public SubmittedImageResponseDto getImageById(Long id) {
        SubmittedImage submittedImage = submittedImageRepository.findById(id)
                .orElseThrow(() -> new GlobalException(ErrorCode.IMAGE_NOT_FOUND));

        return toResponseDto(submittedImage);
    }

    // 제보한 모든 이미지 조회
    public List<SubmittedImageResponseDto> getImages() {
        return submittedImageRepository.findAll()
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    // 제보한 이미지 삭제
    @Transactional
    public void deleteImage(Long id) {
        SubmittedImage submittedImage = submittedImageRepository.findById(id)
                .orElseThrow(() -> new GlobalException(ErrorCode.IMAGE_NOT_FOUND));

        awsS3Service.deleteFile(submittedImage.getS3Key());

        submittedImageRepository.delete(submittedImage);
    }

    private SubmittedImageResponseDto toResponseDto(SubmittedImage submittedImage) {

        return SubmittedImageResponseDto.builder()
                .id(submittedImage.getId())
                .pool(submittedImage.getPool())
                .user(submittedImage.getUser())
                .imageUrl(submittedImage.getImageUrl())
                .originalName(submittedImage.getOriginalName())
                .build();
    }

}

