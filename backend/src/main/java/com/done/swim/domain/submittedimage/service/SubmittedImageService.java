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

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SubmittedImageService {

    private final SubmittedImageRepository submittedImageRepository;
    private final AwsS3Service awsS3Service;

    /**
     * 이미지 생성
     *
     * @param requestDto 요청 DTO
     */
    @Transactional
    public SubmittedImageResponseDto createImage(SubmittedImageRequestDto requestDto) {

        // application.properties에서 크기 제한 설정 해놨지만 클라이언트 에러메세지 보여주도록 추가 처리
        if (requestDto.getFile().getSize() > 3 * 1024 * 1024) {
            throw new GlobalException(ErrorCode.PAYLOAD_TOO_LARGE);
        }

        Map<String, String> findOneImage = awsS3Service.uploadImage(requestDto.getFile());

        return SubmittedImageResponseDto.from(
                submittedImageRepository.save(
                        requestDto.toEntity(findOneImage)
                )
        );

    }

    /**
     * 특정 이미지 조회
     *
     * @param id 이미지 아이디
     */
    public SubmittedImageResponseDto getImageById(Long id) {
        SubmittedImage submittedImage = submittedImageRepository.findById(id)
                .orElseThrow(() -> new GlobalException(ErrorCode.IMAGE_NOT_FOUND));

        return SubmittedImageResponseDto.from(submittedImage);
    }

    /**
     * 모든 이미지 조회
     */
    public List<SubmittedImageResponseDto> getImages() {
        return submittedImageRepository.findAll()
                .stream()
                .map(SubmittedImageResponseDto::from)
                .toList();
    }

    /**
     * 이미지 삭제
     *
     * @param id 이미지 아이디
     */
    @Transactional
    public void deleteImage(Long id) {
        SubmittedImage submittedImage = submittedImageRepository.findById(id)
                .orElseThrow(() -> new GlobalException(ErrorCode.IMAGE_NOT_FOUND));

        awsS3Service.deleteFile(submittedImage.getS3Key());

        submittedImageRepository.delete(submittedImage);
    }


}

