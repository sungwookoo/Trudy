package com.ssafy.trudy.post.service;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.repository.MemberRepository;
import com.ssafy.trudy.post.model.*;
import com.ssafy.trudy.post.repository.*;
import io.jsonwebtoken.impl.crypto.MacProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    //post Entity 관련 Repository
    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final PostCategoryRepository postCategoryRepository;
    private final PostAreaRepository postAreaRepository;
    private final PostLikeRepository postLikeRepository;

    //comment Entity 관련 Repository
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final NestedCommentRepository nestedCommentRepository;
    private final NestedCommentLikeRepository nestedCommentLikeRepository;


    //member Entity Repository
    private final MemberRepository memberRepository;

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

    //포럼 게시글 상세보기(게시글 + )
    public void /*Optional<Post>*/ findPostDetail(Long postId) throws  Exception{

        log.info("postService - findPostDetail");
        postId = 0L;

        //1. post entity를 가져옴
        Post postEntity = postRepository.findById(postId).get();

        //2. postCombine에 1개 글 상세정보(게시글, member, image, area, category, like_Count)를 채워 넣음
        PostDto.PostCombine postCombine = new PostDto.PostCombine();

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

        postCombine = new PostDto.PostCombine(postElement, memberElement, postImageElementList, postAreaElementList, postCategoryElementLIst, postLikeCount);


         /*
        post entity를 가져옴
    comments entity 를 전부 구해옴
    해당 comments entity로
    -> comment_like count를 구한다, nested_comment entity를 구해옴
        -> nested_comment entity로 nested_comment like count를 구해온다
     */

        //3. post Entity를 이용해 댓글 정보를 채워 넣음
        PostDto.CommentCombine commentCombine;

        // 댓글 정보만 채우기
//        PostDto.CommentElement commentElement = modelMapper.map(commentRepository.findByPostId(postEntity), PostDto.CommentElement.class);

        log.info("0번 글 ========= " + postCombine);
        log.info("0번 글 댓글 ========= " + commentRepository.findByPostId(postEntity));





        //Optional 클래스는 여러 가지 API를 제공하여 null일 수도 있는 객체를 다룰 수 있도록 돕습니다.
//        Optional<Post> post = postRepository.findById(postId);
//
//        log.info(post.toString());

//        return post;
    }

    //포럼 게시글 좋아요 - 정상 동작
    public void addPostLike(Long memberId, Long postId){
//        log.info("Service - addPostLike - memberId : postId" + memberId +" : "+postId);

        //postLike Entity의 존재 확인을 위해 Member Entity와 Post Entity를 찾아온다.
        Member memberEntity = memberRepository.findById(memberId).get();
        Post postEntity = postRepository.findById(postId).get();

        //확인
//        log.info("Service addPostLike func - memberEntity ============== "+ memberEntity );
//        log.info("Service addPostLike func - postEntity ============== "+ postEntity);

        //member Entity와 postEntity로 구성된 postLike Entity가 있는지 확인하고, 없으면 저장하기 위한 postLikeEntity
        PostLike postLikeEntityFind = postLikeRepository.findByMemberIdAndPostId(memberEntity, postEntity);
        PostLike postLikeEntitySave = new PostLike(memberEntity, postEntity);

        //member Entity와 postEntity로 구성된 post like가 있는지 보고 없으면 추가해주고, 있으면 지운다.
        if(postLikeEntityFind == null) postLikeRepository.save(postLikeEntitySave);
        else postLikeRepository.delete(postLikeEntityFind);

    }

    //포럼 게시글 댓글 작성 - 정상 동작
    public void addPostComment(Long memebrId, Long postId, String content){
        //준비물 준비 : memebr Entity, post Entity,
        Member memberEntity = memberRepository.findById(memebrId).get();
        Post postEntity = postRepository.findById(postId).get();

        //PostCommentRepository에 저장하기 위핸 PostComment Entity 준비 및 저장
        Comment commentEntitySave = new Comment(postEntity, memberEntity, content, (byte) 0, LocalDateTime.now());
        commentRepository.save(commentEntitySave);
    }

    //댓글 삭제
    public void removePostComment(){

    }

    //대댓글 작성 - 정상 동작
    public void addPostNestedComment(Long memebrId, Long commentId, String content){
        //준비물 준비 : memebr Entity, comment Entity,
        Member memberEntity = memberRepository.findById(memebrId).get();
        Comment commentEntity = commentRepository.findById(commentId).get();

        //PostCommentRepository에 저장하기 위핸 PostComment Entity 준비 및 저장
        NestedComment nestedCommentEntitySave = new NestedComment(commentEntity, memberEntity, content, LocalDateTime.now());
        nestedCommentRepository.save(nestedCommentEntitySave);
    }

    //대댓글 좋아요 - 정상 동작
    public void addPostNestedCommentLike(Long memberId, Long nestedCommentId){
        //NestedCommentLike entity의 존재 확인을 위해 Member entity와 NestedComment entity를 찾아온다.
        Member memberEntity = memberRepository.findById(memberId).get();
        NestedComment nestedCommentEntity = nestedCommentRepository.findById(nestedCommentId).get();

        //member Entity와 nestedComment Entity로 구성된 nestedCommentLike Entity가 있는지 확인하고, 없으면 저장하기 위한 NestedCommentLike를 만듦
        NestedCommentLike nestedCommentLikeFind = nestedCommentLikeRepository.findByMemberIdAndNestedCommentId(memberEntity, nestedCommentEntity);
        NestedCommentLike nestedCommentLikeSave = new NestedCommentLike(memberEntity, nestedCommentEntity);

        //Member Entity와 NestedComment로 구성된 NestedCommentLike가 있는지 보고 없으면 추가해주고, 있으면 지운다.
        if(nestedCommentLikeFind == null) nestedCommentLikeRepository.save(nestedCommentLikeSave);
        else nestedCommentLikeRepository.delete(nestedCommentLikeFind);
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
