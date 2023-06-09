import React, { useState } from 'react'
import { Link, useLoaderData, redirect, Form, useNavigate } from 'react-router-dom'
import { axiosReissue, axiosAuth } from '../../_actions/axiosAuth';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faEye, faDownload } from '@fortawesome/free-solid-svg-icons'

import ProfileImg from "../../components/commons/ProfileImg";
import { getArtImage } from "../../components/commons/imageModule";
import { YellowBtn, RedBtn, LikeBtn } from "../../components/commons/buttons";
import {Category} from "../../components/commons/Category";
import './ArtsDetail.css'

export async function loader ({params}) {
  axiosReissue();
  let artSeq = params.art_seq;

  let artData = null
  await axiosAuth.get(`arts/detail/${artSeq}`)
    .then(response => artData = response.data)
    .catch(error => console.log(error))

  let likeList = null;
  await axiosAuth.get(`arts/${localStorage.getItem("userSeq")}/like`)
    .then(response=> likeList = response.data)
    .catch(error => console.log(error))

  return [artData, likeList];
}

export async function action ({request, params}) {
  console.log(request);
  const artSeq = +params.art_seq;
  if (request.method === "DELETE") {
    const body = {
      "seq" : artSeq
    }
    console.log(body)
    await axiosAuth.delete('arts/delete', {
      data: {
        seq : artSeq
      }
    })
      .then(response => console.log(response))
      .catch(error => console.log(error))

  }
  else if (request.method === "PUT") {
    console.log("put")
  }

  return redirect('/')
}


function ArtsDetail() {
  const [artData, likeList] = useLoaderData();
  let likeState = likeList?.find((like) => like.artSeq === artData.artSeq) || false;
  const [isLiked, setIsLiked] = useState(likeState)
  const [likeCount, setLikeCount] = useState(artData.artLikeCount)
  const [downloadCount, setDownloadCount] = useState(artData.artDownloadCount)
  const navigate = useNavigate()
  console.log(likeList)
  console.log(likeState);

  return (
    <div>
      <div className="art-detail__container grid__detail-page">
        <img
          src={`${getArtImage(artData.artImg, artData.userSeq)}`}
          alt="작품 이미지"
          className="art-img"
        />

        {/* 작품 상세 정보 */}
        <div className="art-detail_content">
          <div className="art-detail__main-info">
            <div className="art-detail__title">
              <h1>{artData.artName}</h1>
              { artData.userSeq === +localStorage.getItem('userSeq') &&
                <div className="art-detail__manage">
                  <Form method="delete"><RedBtn type="submit">삭제하기</RedBtn></Form>
                  <Form method="put"><YellowBtn type="submit">수정하기</YellowBtn></Form>
                </div> }
            </div>
            <Link className="art-detail__profile link" to={`../${artData.nickname}@${artData.userSeq}`}>
              <ProfileImg height="30px" width="30px" url={artData.profileImg} userSeq={artData.userSeq} />
              <div>{artData.nickname} <span className="jakka">작가</span></div>
            </Link>

            <div className="upload_date">{`${artData.artRegDate[0]}.${(artData.artRegDate[1]+'').padStart(2, "0")}.${(artData.artRegDate[2]+'').padStart(2, "0")}`}</div>
            <div className="arts_description" style={{whiteSpace: "pre-line"}}>
              {artData.artDescription}
            </div>



            <Category className="art-detail__category" onClick={() => {navigate({pathname: '/arts', search: `?category=${artData.artCategory.id}`})}}>
              {artData.artCategory.artCategoryName}
            </Category>
          </div>

          <div>

            <div className="art-detail__sub-info">
              <div className="views">
                <FontAwesomeIcon icon={faEye} /> {artData.artHit}
              </div>
              <div className="downloaded">
                <FontAwesomeIcon icon={faDownload} /> {downloadCount}
              </div>
              <div className="likes">
                <FontAwesomeIcon icon={faHeart} /> {likeCount}
              </div>
            </div>

            <div className="art-detail__btns">
              {/* 좋아요 누른 버튼이랑 안누른 버튼 */}
              <form onSubmit={(event) => {
                event.preventDefault()
                axiosReissue();
                console.log(artData.artSeq)
                let body = { "seq": artData.artSeq };
                if (isLiked) {
                  axiosAuth.delete(`arts/like`, {data: body})
                  .then(response => response)
                  .catch(error => {
                    console.log(error)
                  })
                  setLikeCount(prev => prev - 1)
                }
                else if (!isLiked) {
                  axiosAuth.post(`arts/like`, body)
                    .then(response => response)
                  setLikeCount(prev => prev + 1)
                }
                setIsLiked(prev=>!prev)
              }}>
                <LikeBtn isLike={isLiked} />
              </form>

              <form action={`https://i8a108.p.ssafy.io/api/arts/download/${artData.artSeq}`}
                    method="get"
                    onSubmit={() => setDownloadCount(prev => prev + 1)}
              >
                <YellowBtn style={{width: "120px"}} type="submit">다운로드</YellowBtn>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*<div className="familiar_arts">*/}
      {/*  <h2>비슷한 작품</h2>*/}
      {/*  <div>*/}
      {/*    비슷한 작품 컴포넌트들이 올 곳*/}
      {/*  </div>*/}
      {/*</div>*/}


    </div>
  )
}

export default ArtsDetail