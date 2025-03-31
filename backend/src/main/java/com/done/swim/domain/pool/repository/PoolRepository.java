package com.done.swim.domain.pool.repository;

import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.swimmingtime.entity.Week;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PoolRepository extends JpaRepository<Pool, Long> {

    /**
     * @param id 수영장 식별 아이디
     */
    @Query("""
            SELECT p FROM Pool p
            LEFT JOIN FETCH p.swimmingTimes st
            WHERE p.id = :id
            ORDER BY st.startTime ASC
            """

    )
    Optional<Pool> findByIdWithCommentAndTimes(@Param("id") Long id);

    /**
     * 수영장 요약 정보 + 요일 자유 수영 시간
     *
     * @param poolName     수영장 이름
     * @param nowDayOfWeek 요일
     */
    @Query("""
            SELECT p
            FROM Pool p
            LEFT JOIN FETCH p.swimmingTimes st
            WHERE p.name = :poolName
            AND (st.dayOfWeek = :nowDayOfWeek OR st IS NULL)
            ORDER BY st.startTime ASC
            """)
    Optional<Pool> getPoolWithName(@Param("poolName") String poolName, @Param("nowDayOfWeek") Week nowDayOfWeek);

    /**
     * 지역의 수영장 요약 정보 + 유저의 찜 목록
     *
     * @param section 지역명
     * @param userId  유저 아이디
     */
    @Query("""
            SELECT p
            FROM Pool p
            LEFT JOIN FETCH p.poolMarks pm
            WHERE p.section = :section
            AND (pm.user.id = :userId OR pm.user IS NULL)
            """)
    List<Pool> findBySectionWithUserId(@Param("section") String section, @Param("userId") Long userId);
}
