package com.done.swim.domain.submittedimage.entity;

import com.done.swim.common.BaseTimeEntity;
import com.done.swim.domain.pool.entity.Pool;
import com.done.swim.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "submitted_images")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class SubmittedImage extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "pool_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Pool pool;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String originalName;

    @Column(nullable = false)
    private String s3Key;

    @Builder
    public SubmittedImage(Pool pool, User user, String imageUrl, String originalName, String s3Key) {
        this.pool = pool;
        this.user = user;
        this.imageUrl = imageUrl;
        this.originalName = originalName;
        this.s3Key = s3Key;
    }


}
