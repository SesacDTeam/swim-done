package com.done.swim.domain.poolreview.repository;

import com.done.swim.domain.poolreview.entity.PoolReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PoolReviewRepository extends JpaRepository<PoolReview, Long> {

    Page<PoolReview> findAllByUserId(Long userId, Pageable pageable);

    @Query("""
                SELECT pr
                FROM PoolReview pr
                WHERE pr.id = :poolReviewId AND pr.user.id = :userId
            """)
    Optional<PoolReview> findByIdAndUserId(@Param("poolReviewId") Long poolReviewId, @Param("userId") Long userId);

}
