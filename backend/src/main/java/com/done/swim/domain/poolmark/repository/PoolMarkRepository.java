package com.done.swim.domain.poolmark.repository;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.poolmark.entity.PoolMark;
import com.done.swim.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoolMarkRepository extends JpaRepository<PoolMark, Long> {

    /**
     * 특정 수영장에 대한 유저의 찜여부
     *
     * @param user 유저
     * @param pool 수영장
     */
    PoolMark findByUserAndPool(User user, Pool pool);

    /**
     * 페이징 처리된 유저의 찜 목록
     *
     * @param userId   유저 아이디
     * @param pageable 페이저블
     */
    Page<PoolMark> findByUserId(Long userId, Pageable pageable);
}
