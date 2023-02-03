package com.ssafy.trudy.post.service;

import com.ssafy.trudy.post.model.*;
import com.ssafy.trudy.post.repository.*;
import io.jsonwebtoken.impl.crypto.MacProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final PostCategoryRepository postCategoryRepository;
    private final PostAreaRepository postAreaRepository;
    private final PostLikeRepository postLikeRepository;

    ModelMapper modelMapper = new ModelMapper();

    //포럼 게시글 목록 가져오기
    public List<PostDto.PostCombine> findPostList(){
        log.info("============Post Service / findPostList==========");

        //Post Entity를 담을 리스트(post Entity로 postImage, postArea, postCategory, postLikeCount를 검색해서 가져옴)
        List<Post> postEntityList = postRepository.findAll();

        //Dto를 담을 리스트()
        List<PostDto.PostCombine> postCombineList = new ArrayList<>();

        for(Post postEntity : postEntityList){

            PostDto.PostElement postElement = modelMapper.map(postEntity, PostDto.PostElement.class);
            PostDto.MemberElement memberElement = modelMapper.map(postEntity.getMemberId(), PostDto.MemberElement.class);

            //image 정보 리스트 가져와서 DTO에 저장
            List<PostDto.PostImageElement> postImageElementList = postImageRepository.findByPostId(postEntity)
                    .stream()
                    .map(p -> modelMapper.map(p, PostDto.PostImageElement.class)).collect(Collectors.toList());

            //area 정보 리스트 가져와서 DTO에 저장
            List<PostDto.PostAreaElement> postAreaElementList = postAreaRepository
                    .findByPostId(postEntity)
                    .stream()
                    .map(p -> new PostDto.PostAreaElement(
                            modelMapper.map(p.getSigunguCode().getAreaCode(), PostDto.AreaElement.class),
                            modelMapper.map(p.getSigunguCode(), PostDto.SigunguElement.class)
                    )).collect(Collectors.toList());

            //category 정보 리스트 가져와서 DTO에 저장
            List<PostDto.PostCategoryElement> postCategoryElementLIst = postCategoryRepository
                    .findByPostId(postEntity)
                    .stream()
                    .map(p -> modelMapper.map(p, PostDto.PostCategoryElement.class)).collect(Collectors.toList());

            //postLikeCount 정보 가져옴
            int postLikeCount = postLikeRepository.countByPostId(postEntity);

            //한개 포럼글에 대한 정보를 묶음
            postCombineList.add(new PostDto.PostCombine(postElement, memberElement, postImageElementList, postAreaElementList, postCategoryElementLIst, postLikeCount));



        }
//        for(int i=0; i<postCombineList.size(); i++) {
//            log.info(i + " post+++++++ : " + postCombineList.get(i).getPostElement().toString());
//            log.info(i + " member+++++++ : " + postCombineList.get(i).getMemberElement().toString());
//            log.info(i + " image+++++++ : " + postCombineList.get(i).getPostImageElementList().toString());
//            log.info(i + " area+++++++ : " + postCombineList.get(i).getPostAreaElementList().toString());
//            log.info(i + " category+++++++ : " + postCombineList.get(i).getPostCategoryElementList().toString());
//            log.info(i + " count+++++++ : " + postCombineList.get(i).getPostLikeCount());
//        }

        log.info(postCombineList.toString());
        return postCombineList;
    }

    //포럼 게시글 작성
    public void addPost(){
        // dto안에 dto를 각각 접근하여 entity화를 한다 -> 저장한다(posts먼저 새기고 id 가져와서 나머지 애들 새긴다.)
        PostCategory save = postCategoryRepository.save(new PostCategory(CategoryName.Restaurant));
        log.info("category test ============= " + save.toString());

    }

    //포럼 게시글 수정
    public void modifyPost(){

    }

    //포럼 게시글 삭제
    public void removePost(){

    }

    //포럼 게시글 상세보기
    public void /*Optional<Post>*/ findPostDetail(Long postId) throws  Exception{

        /*
        post entity를 가져옴
    comments entity 를 전부 구해옴
    해당 comments entity로
    -> comment_like count를 구한다, nested_comment entity를 구해옴
        -> nested_comment entity로 nested_comment like count를 구해온다
     */
        //front에 전송할 객체
        PostDto.CommentCombine CommentRepository = new PostDto.CommentCombine();

        //post entity를 가져옴
        Post postEntity = postRepository.findById(postId).get();

        //postCombine 가져오는 코드 복사

        //




        //Optional 클래스는 여러 가지 API를 제공하여 null일 수도 있는 객체를 다룰 수 있도록 돕습니다.
//        Optional<Post> post = postRepository.findById(postId);
//
//        log.info(post.toString());

//        return post;
    }

    //포럼 게시글 좋아요
    public void addPostLike(){

    }

    //포럼 게시글 댓글 작성
    public void addPostComment(){

    }

    //댓글 삭제
    public void removePostComment(){

    }

    //대댓글 작성
    public void addPostNestedComment(){

    }

    //대댓글 좋아요
    public void addPostNestedCommentLike(){

    }

    //대댓글 삭제
    public void removePostNestedComment(){

    }

    public List<Post> getAllByUserId(Long memberId) {
        return postRepository.findAllByMemberId(memberId);
    }

    public List<Post> getAllByUserIds(List<Long> memberIds) {
        return postRepository.findAllByMemberIdIn(memberIds);
    }

}
