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
    public String /*List<Post>*/ findPostList(){
        //엔티티를 담을 리스트
//        List<Post> posts = postRepository.findAll().stream().map(p->);
//        List<PostImage> postImages = new ArrayList<>();
//        List<PostCategory> postCategories = new ArrayList<>();
//        List<PostArea> postAreas  = new ArrayList<>();

//        List<PostDto.> posts = postRepository.findAll();
//        List<PostImage> postImages = new ArrayList<>();
//        List<PostCategory> postCategories = new ArrayList<>();
//        List<PostArea> postAreas  = new ArrayList<>();

//        log.info(posts.get(0).toString());
//        log.info(posts.get(0).getId().toString());
//        log.info("test" + postAreaRepository.findByPostId(posts.get(0)));
//        log.info("convert : " + modelMapper.map(postAreaRepository.findByPostId(posts.get(0)), PostDto.PostAreaElement.class));



        //Post Entity를 담을 리스트(post Entity로 postImage, postArea, postCategory, postLikeCount를 검색해서 가져옴)
        List<Post> postEntities = postRepository.findAll();//.stream().map(p->new PostDto.PostWithMemeber(modelMapper.map(p, PostDto.PostElement.class),modelMapper.map(p.getMemberId(), PostDto.MemberElement.class) ) ).collect(Collectors.toList());


        //PostArea postArea =  postAreaRepository.findByPostId(postEntities.get(0));

//        log.info("postArea entity print +++++++++++: " + postArea);
//        log.info("postArea entity to SigunguElement print +++++++++++: " + modelMapper.map(postArea.getSigunguCode(), PostDto.SigunguElement.class));
//        log.info("postArea entity to AreaElement print +++++++++++: " + modelMapper.map(postArea.getSigunguCode().getAreaCode(), PostDto.AreaElement.class));

        //Dto를 담을 리스트()
        List<PostDto.PostCombine> postCombines = new ArrayList<>();

        for(Post postEntity : postEntities){

            PostDto.PostElement postElement = modelMapper.map(postEntity, PostDto.PostElement.class);
            PostDto.MemberElement memberElement = modelMapper.map(postEntity.getMemberId(), PostDto.MemberElement.class);

            //image 정보 리스트 가져오기
            List<PostDto.PostImageElement> postImageElements = postImageRepository.findByPostId(postEntity)
                    .stream()
                    .map(p -> modelMapper.map(p, PostDto.PostImageElement.class)).collect(Collectors.toList());

            //area 정보 리스트 가져오기
            List<PostDto.PostAreaElement> postAreaElements = postAreaRepository
                    .findByPostId(postEntity)
                    .stream()
                    .map(p -> new PostDto.PostAreaElement(
                            modelMapper.map(p.getSigunguCode().getAreaCode(), PostDto.AreaElement.class),
                            modelMapper.map(p.getSigunguCode(), PostDto.SigunguElement.class)
                    )).collect(Collectors.toList());


            //category 정보 리스트 가져오기
            List<PostDto.PostCategoryElement> postCategoryElements = postCategoryRepository
                    .findByPostId(postEntity)
                    .stream()
                    .map(p -> modelMapper.map(p, PostDto.PostCategoryElement.class)).collect(Collectors.toList());;

            int postLikeCount = postLikeRepository.countByPostId(postEntity);

            postCombines.add(new PostDto.PostCombine(postElement, memberElement, postImageElements, postAreaElements, postCategoryElements, postLikeCount));


        }

        for(int i=0; i<postCombines.size(); i++) {
            log.info(i + " post+++++++ : " + postCombines.get(i).getPostElement().toString());
            log.info(i + " member+++++++ : " + postCombines.get(i).getMemberElement().toString());
            log.info(i + " image+++++++ : " + postCombines.get(i).getPostImageElements().toString());
            log.info(i + " area+++++++ : " + postCombines.get(i).getPostAreaElements().toString());
            log.info(i + " category+++++++ : " + postCombines.get(i).getPostCategoryElements().toString());
            log.info(i + " count+++++++ : " + postCombines.get(i).getPostLikeCount());
        }

        //List<PostDto.PostImageElement> postImageElements = PostImageRepository.findB
       // List<PostDto.PostAreaElement> postAreaElements = postAreaRepository.findByPostId()
        //log.info("test11 : " + postWithMemebers.toString());

//        List<PostDto.PostImageElement> postImageElements = new ArrayList<>();
//        List<PostDto.PostAreaElement> postAreaElements = new ArrayList<>();
//        List<PostDto.PostCategoryElement> postCategoryElements = new ArrayList<>();
//
//        for(PostDto.PostElement postElement : postElements){
//            Long postId = postElement.getId();
//            postImageElements.add(postImageRepository.findByPostId)
//        }
//
//        log.info("test : " + postElements.get(0).toString());

        //엔티티들 가져옴
//        for(Post post : posts){
//            Long id = post.getId();
//            Optional<PostImage> postImage = postImageRepository.findById(id);  //PostImage 엔티티를 가져옴
//            postImages.add(postImage.get());
//
//            Optional<PostCategory> postCategory = postCategoryRepository.findById(id);  //postCategory 엔티티를 가져옴
//            postCategories.add(postCategory.get());
//
//            Optional<PostArea> postArea = postAreaRepository.findById(id);      //postArea 엔티티를 가져옴
//            postAreas.add(postArea.get());
//        }
        //log.info(posts.get(0).toString());


        Map<String, Object> resMap = new HashMap<>();
        //resMap.put()

        return "posts";
    }

    //포럼 게시글 작성
//    public void addPost(PostDto.Post postDto){
//        // dto안에 dto를 각각 접근하여 entity화를 한다 -> 저장한다(posts먼저 새기고 id 가져와서 나머지 애들 새긴다.)
//
//
//    }

    //포럼 게시글 수정
    public void modifyPost(){

    }

    //포럼 게시글 삭제
    public void removePost(){

    }

    //포럼 게시글 상세보기
    public Optional<Post> findPostDetail(Long postId) throws  Exception{
        //Optional 클래스는 여러 가지 API를 제공하여 null일 수도 있는 객체를 다룰 수 있도록 돕습니다.
        Optional<Post> post = postRepository.findById(postId);

        log.info(post.toString());

        return post;
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

}
