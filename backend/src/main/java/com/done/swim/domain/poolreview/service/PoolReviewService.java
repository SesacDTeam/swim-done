package com.done.swim.domain.poolreview.service;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.poolreview.dto.requestdto.CreatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.requestdto.UpdatePoolReviewRequestDto;
import com.done.swim.domain.poolreview.dto.responsedto.CreatePoolReviewResponseDto;
import com.done.swim.domain.poolreview.dto.responsedto.MyReviewResponseDto;
import com.done.swim.domain.poolreview.dto.responsedto.ReviewResponseDto;
import com.done.swim.domain.poolreview.entity.PoolReview;
import com.done.swim.domain.poolreview.repository.PoolReviewRepository;
import com.done.swim.domain.user.entity.User;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PoolReviewService {

    private final PoolReviewRepository poolReviewRepository;
    private final PoolRepository poolRepository;

    @Transactional
    public CreatePoolReviewResponseDto createReview(Long poolId,
        CreatePoolReviewRequestDto requestDto,
        User user
    ) {
        log.info("create review");
        Pool pool = poolRepository.findById(poolId)
            .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.POOL_NOT_FOUND));

        PoolReview poolReview = requestDto.toEntity(pool, user);
        poolReviewRepository.save(poolReview);

        return CreatePoolReviewResponseDto.from(poolReview);

    }

    public Map<String, Object> getMyReviews(Long userId, Pageable pageable) {
        Page<PoolReview> poolReviews = poolReviewRepository.findAllByUserId(userId, pageable);

        Page<MyReviewResponseDto> response = poolReviews.map(MyReviewResponseDto::from);

        long totalCount = poolReviews.getTotalElements();

        boolean hasNext = poolReviews.hasNext();

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("reviews", response.getContent());
        responseBody.put("totalCount", totalCount);
        responseBody.put("hasNext", hasNext);

        return responseBody;
    }

    public getReviewBeforeDateResponseDto getReviewBeforeDate(Long reviewId,
        Long userID) {
        PoolReview poolReview = poolReviewRepository.findById(reviewId)
            .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.REVIEW_NOT_FOUND));

        if (poolReview.getUser().getId() != userID) {
            throw new ForBiddenException(ErrorCode.AUTHOR_ONLY);
        }

        return getReviewBeforeDateResponseDto.from(poolReview);
    }

    @Transactional
    public void updateReview(Long reviewId,
        UpdatePoolReviewRequestDto requestDto,
        User user) {
        System.out.println("updateService");

        PoolReview poolReview = poolReviewRepository.findById(reviewId)
            .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.REVIEW_NOT_FOUND));

        if (poolReview.getUser().getId() != user.getId()) {
            throw new ForBiddenException(ErrorCode.AUTHOR_ONLY);
        }

        poolReview.setContent(requestDto.getContent());

    }

    @Transactional
    public void deleteReview(Long reviewId, User user) {
        PoolReview poolReview = poolReviewRepository.findById(reviewId)
            .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.REVIEW_NOT_FOUND));

        if (poolReview.getUser().getId() != user.getId()) {
            throw new ForBiddenException(ErrorCode.AUTHOR_ONLY);
        }

        poolReviewRepository.deleteById(reviewId);
    }

    /**
     * 리뷰 생성
     *
     * @param poolId     수영장 식별 아이디
     * @param requestDto 요청 DTO
     * @param user       유저
     */
    @Transactional
    public CreatePoolReviewResponseDto createReview(Long poolId,
                                                    CreatePoolReviewRequestDto requestDto,
                                                    User user
    ) {
        Pool pool = poolRepository.findById(poolId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.POOL_NOT_FOUND));

        PoolReview poolReview = requestDto.toEntity(pool, user);
        poolReviewRepository.save(poolReview);

        return CreatePoolReviewResponseDto.from(poolReview);

    }


    /**
     * 유저의 리뷰 모음
     *
     * @param userId   유저 아이디
     * @param pageable 페이저블
     */
    public MyReviewResponseDto getMyReviews(Long userId, Pageable pageable) {
        Page<PoolReview> poolReviews = poolReviewRepository.findAllByUserId(userId, pageable);

        return MyReviewResponseDto.from(poolReviews);

    }

    /**
     * 리뷰 단건 조회
     *
     * @param reviewId 리뷰 아이디
     * @param userId   유저 아이디
     */
    public ReviewResponseDto getReview(Long reviewId,
                                       Long userId) {
        PoolReview poolReview = poolReviewRepository.findByIdAndUserId(reviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.REVIEW_NOT_FOUND));

        return ReviewResponseDto.from(poolReview);
    }

    /**
     * 리뷰 수정
     *
     * @param reviewId   리뷰 아이디
     * @param requestDto 요청 DTO
     * @param user       유저
     */
    @Transactional
    public void updateReview(Long reviewId,
                             UpdatePoolReviewRequestDto requestDto,
                             User user) {

        PoolReview poolReview = poolReviewRepository.findByIdAndUserId(reviewId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.REVIEW_NOT_FOUND));

        poolReview.setContent(requestDto.getContent());

    }

    /**
     * 리뷰 삭제
     *
     * @param reviewId 리뷰 아이디
     * @param user     유저
     */
    @Transactional
    public void deleteReview(Long reviewId, User user) {
        PoolReview poolReview = poolReviewRepository.findByIdAndUserId(reviewId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.REVIEW_NOT_FOUND));

        poolReviewRepository.delete(poolReview);
    }
}

