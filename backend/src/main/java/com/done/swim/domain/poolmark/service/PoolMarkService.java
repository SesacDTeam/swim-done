package com.done.swim.domain.poolmark.service;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.pool.repository.PoolRepository;
import com.done.swim.domain.poolmark.dto.PoolMarkListResponseDto;
import com.done.swim.domain.poolmark.entity.PoolMark;
import com.done.swim.domain.poolmark.repository.PoolMarkRepository;
import com.done.swim.domain.user.entity.User;
import com.done.swim.global.exception.ErrorCode;
import com.done.swim.global.exception.GlobalException;
import com.done.swim.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PoolMarkService {

    private final PoolMarkRepository poolMarkRepository;
    private final PoolRepository poolRepository;

    /**
     * 찜 생성
     *
     * @param poolId 수영장 식별 아이디
     * @param user   유저
     */
    @Transactional
    public void createPoolMark(Long poolId, User user) {
        Pool pool = fetchPool(poolId);

        Optional<PoolMark> alreadyMarkedPool = poolMarkRepository.findByUserAndPool(user, pool);

        if (alreadyMarkedPool.isPresent()) {
            throw new GlobalException(ErrorCode.ALREADY_MARK);
        }

        PoolMark poolMark = PoolMark.builder().user(user).pool(pool).build();
        poolMarkRepository.save(poolMark);
    }

    /**
     * 유저의 찜 조회
     *
     * @param pageable 페이저블
     * @param userId   유저 아이디
     */
    public PoolMarkListResponseDto getMyPoolMark(Pageable pageable, Long userId) {
        Page<PoolMark> poolMarkPage = poolMarkRepository.findByUserId(userId, pageable);

        return PoolMarkListResponseDto.from(poolMarkPage);
    }

    /**
     * 찜 삭제
     *
     * @param poolId 수영장 식별 아이디
     * @param user   유저
     */
    @Transactional
    public void deleteMyPoolMark(Long poolId, User user) {
        Pool pool = fetchPool(poolId);

        PoolMark alreadyMarkedPool = poolMarkRepository.findByUserAndPool(user, pool)
                .orElseThrow(() -> new GlobalException(ErrorCode.NOT_MARK));

        poolMarkRepository.delete(alreadyMarkedPool);
    }

    private Pool fetchPool(Long poolId) {
        return poolRepository.findById(poolId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.POOL_NOT_FOUND));
    }
}
