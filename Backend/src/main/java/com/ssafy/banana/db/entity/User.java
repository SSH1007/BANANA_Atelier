package com.ssafy.banana.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.ssafy.banana.db.entity.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue
	@Column(name = "user_seq", nullable = false)
	private Long id;

	@Column(name = "email", nullable = false, length = 50, unique = true)
	private String email;

	@Column(name = "password", nullable = false, length = 100)
	private String password;

	@Column(name = "nickname", nullable = false, length = 12, unique = true)
	private String nickname;

	@Column(name = "profile_img", nullable = false, length = 100)
	@ColumnDefault("default_profile_1.png")
	private String profileImg;

	@Column(name = "artist_like_count", nullable = false)
	private int artistLikeCount;

	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false, length = 10)
	private Role role;

	@Column(name = "is_authorized", nullable = false)
	private boolean isAuthorized;

	public boolean getIsAuthorized() {
		return isAuthorized;
	}

	public void setIsAuthorized(boolean isAuthorized) {
		this.isAuthorized = isAuthorized;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getProfileImg() {
		return profileImg;
	}

	public void setProfileImg(String profileImg) {
		this.profileImg = profileImg;
	}

	public int getArtistLikeCount() {
		return artistLikeCount;
	}

	public void setArtistLikeCount(int artistLikeCount) {
		this.artistLikeCount = artistLikeCount;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

}