package com.done.swim.domain.poolreview.entity;

import com.done.swim.common.BaseTimeEntity;
import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Getter
@Table(name = "pool_reviews")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PoolReview extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @JoinColumn(name = "pool_id")
  @ManyToOne(fetch = FetchType.LAZY)
  private Pool pool;

  @JoinColumn(name = "user_id")
  @ManyToOne(fetch = FetchType.LAZY)
  private User user;

  @Column(nullable = false, length = 100)
  private String content;

  @CreatedDate
  @Column(updatable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column
  private LocalDateTime updatedAt;

  @Builder
  public PoolReview(Pool pool, User user, String content) {
    this.pool = pool;
    this.user = user;
    this.content = content;
  }
}
