package com.ssafy.trudy.post.service;

import com.ssafy.trudy.etc.model.Sigungu;
import com.ssafy.trudy.etc.repository.SigunguRepository;
import com.ssafy.trudy.exception.ApiException;
import com.ssafy.trudy.exception.ServiceErrorType;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.model.dto.MemberResponse;
import com.ssafy.trudy.member.repository.IntroduceRepository;
import com.ssafy.trudy.member.repository.MemberRepository;
import com.ssafy.trudy.member.service.MemberService;
import com.ssafy.trudy.post.model.*;
import com.ssafy.trudy.post.repository.*;
import com.ssafy.trudy.upload.AwsS3Uploader;
import io.jsonwebtoken.impl.crypto.MacProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private final MemberService memberService;

    //area entity Repository
    private final SigunguRepository sigunguRepository;

    // AWS S3
    private final AwsS3Uploader awsS3Uploader;
    ModelMapper modelMapper = new ModelMapper();

    //포럼 게시글 목록 가져오기1
    public Page<PostDto.PostCombine> findPostList(String title,
                                   String content,
                                   List<Long> sigunguIdList,
                                   List<String> categoryList,
                                   Pageable pageable){
        log.info("============Post Service / findPostList==========");

        Page<Post> filteredPost = postRepository.findAll(PostSpecification.getSearchByPageable(title, content, sigunguIdList, categoryList), pageable);


        if (0 == filteredPost.getTotalElements()) {
            return new PageImpl<>(new ArrayList<>(), filteredPost.getPageable(), filteredPost.getTotalElements());
        }

        log.info("카테고리 에러1");
        //변형 -> DTO 수정해야
        List<PostDto.PostCombine> postCombineList = filteredPost.stream().map(p-> PostDto.PostCombine.builder()
                .postElement(new PostDto.PostElement(p.getId(), p.getTitle(), p.getContent(), p.getThumbnailImage(), p.getCreatedAt(), p.getUpdatedAt()))
                .memberElement(modelMapper.map(p.getMemberId(), PostDto.MemberElement.class))
                .categoryNameList(p.getPostCategoryList().stream().map(c->c.getCategoryName()).collect(Collectors.toList()))
                .sigunguCodeList(p.getPostAreaList().stream().map(a->a.getSigunguCode().getId()).collect(Collectors.toList()))
                .build()).collect(Collectors.toList());

        return new PageImpl<>(postCombineList, filteredPost.getPageable(), filteredPost.getTotalElements());

    }

    //포럼 게시글 작성 - 정상 동작
    @Transactional
    public void addPost(PostDto.InsertPost insertPostDto) throws Exception {
        //entity화를 한다 -> 저장한다(posts먼저 새기고 id 가져와서 나머지 애들 새긴다.)

        //1. post entity 만들어서 저장 후 id 가져오기 -> thumbnail 은 나중에 따로 추가
        Post postEntityInsert = new Post(memberService.getById(insertPostDto.getMemberId()),
                insertPostDto.getTitle(),
                insertPostDto.getContent());
        postRepository.save(postEntityInsert);

        //2. area, category 저장
        List<PostArea> postAreaList = new ArrayList<>();
        for(Long sigunguid : insertPostDto.getSigunguIdList()){
            PostArea postArea = PostArea.builder()
                    .postId(postEntityInsert)
                    .sigunguCode(sigunguRepository.findById(sigunguid).get())
                    .build();
            postAreaList.add(postArea);
        }
        postAreaRepository.saveAll(postAreaList);

        List<PostCategory> postCategoryList = new ArrayList<>();
        for(String categoryName : insertPostDto.getCategoryList()){
            PostCategory postCategory = PostCategory.builder()
                    .postId(postEntityInsert)
                    .categoryName(categoryName).build();
            postCategoryList.add(postCategory);
        }
        postCategoryRepository.saveAll(postCategoryList);

        //3. thumbnail 이미지 저장
        postEntityInsert.setThumbnailImage(insertPostDto.getThumbnailImage());

    }

    public void deleteAllImage(List<String> fileNameList) {
        for(String fileName : fileNameList) {
            awsS3Uploader.delete(fileName);
        }
    }

    //포럼 게시글 수정 - ck에디터와 연관
    @Transactional
    public void modifyPost(Long postId, PostDto.InsertPost insertPostDto){
        log.info("service - update start");
        // post는 수정, postImage, postArea, postCategory는 삭제 후 다시 저장
            //사진 보류
            //사진 post entity로 검색 -> 리스트 가져오고 디비에 삭제 -> aws 사진 삭제
            Post postEntityFind = postRepository.findById(postId).orElseThrow(()-> new ApiException(ServiceErrorType.NOT_FOUND));


        // PostArea, PostCategory 삭제
        postAreaRepository.deleteByPostId(postEntityFind);
        postCategoryRepository.deleteByPostId(postEntityFind);

        // postArea 갱신 (insertPostDto.getSigunguIdList가 있으면 -> 새로운 정보 삽입, 없으면 다 삭제)
        List<PostArea> postAreaList = new ArrayList<>();

        if(insertPostDto.getSigunguIdList() != null){
            for(Long sigunguid : insertPostDto.getSigunguIdList()){
                PostArea postArea = PostArea.builder()
                        .postId(postEntityFind)
                        .sigunguCode(sigunguRepository.findById(sigunguid).orElseThrow(()-> new ApiException(ServiceErrorType.NOT_FOUND)))
                        .build();
                postAreaList.add(postArea);
            }
        }
        postAreaRepository.saveAll(postAreaList);

        // category 갱신 (insertPostDto.getCategoryList가 있으면 -> 새로운 정보 삽입, 없으면 다 삭제)
        List<PostCategory> postCategoryList = new ArrayList<>();

        if(insertPostDto.getCategoryList() != null) {
            for (String categoryName : insertPostDto.getCategoryList()) {
                PostCategory postCategory = PostCategory.builder()
                        .postId(postEntityFind)
                        .categoryName(categoryName).build();
                postCategoryList.add(postCategory);
            }
        }
        postCategoryRepository.saveAll(postCategoryList);

        //post entity 수정(comment 때문에 post 삭제 안함)
        postEntityFind.setTitle(insertPostDto.getTitle());
        postEntityFind.setContent(insertPostDto.getContent());
        postEntityFind.setThumbnailImage(insertPostDto.getThumbnailImage());
    }

    //포럼 게시글 삭제 - 정상 동작1
    public void removePost(Long postId){
        postRepository.deleteById(postId);
    }

    //포럼 게시글 상세보기(게시글 + 댓글) - 정상 동작1
    public Map findPostDetail(Long postId) throws Exception{

        //1. post entity를 가져옴
        Post postEntity = postRepository.findById(postId).get();

        PostDto.PostCombine postCombine = PostDto.PostCombine.builder()
                .postElement(new PostDto.PostElement(postEntity.getId(), postEntity.getTitle(), postEntity.getContent(), postEntity.getThumbnailImage(), postEntity.getCreatedAt(), postEntity.getUpdatedAt()))
                .memberElement(modelMapper.map(postEntity.getMemberId(), PostDto.MemberElement.class))
                .categoryNameList(postEntity.getPostCategoryList().stream().map(PostCategory::getCategoryName).collect(Collectors.toList()))
                .sigunguCodeList(postEntity.getPostAreaList().stream().map(a->a.getSigunguCode().getId()).collect(Collectors.toList()))
                .postLikeCount(postLikeRepository.countByPostId(postEntity))
                .build();

        // post Entity를 이용해 댓글 정보를 채워 넣음
        PostDto.CommentCombine commentCombine = new PostDto.CommentCombine();

        List<PostDto.CommentElement> commentElementList = new ArrayList<>();

        //for(comment entity 갯수) {comment_like count를 구한다 + {nested_comment entity를 구한다. + nested_comment_like count를 구한다.}}
        for(Comment commentEntity : postEntity.getCommentList()){
            //1. Comment DTO 생성
            PostDto.CommentElement commentElement = new PostDto.CommentElement();

            //2. Comment DTO에 Comment entity를 DTO로 변환후 저장
            commentElement = modelMapper.map(commentEntity, PostDto.CommentElement.class);

            //3. Comment DTO에 entity를 DTO로 변환후 CustomMemberForComment 저장
            commentElement.setCustomMemberForComment(modelMapper.map(commentEntity.getPostId().getMemberId(), PostDto.CustomMemberForComment.class));

            //4. comment DTO에 comment_like count 저장
            commentElement.setCommentLikeCount(commentLikeRepository.countByCommentId(commentEntity));

            //5. nested_comment List 채우기
            List<PostDto.NestedCommentElement> nestedCommentElementList= new ArrayList<>();
            List<NestedComment> nestedCommentList = nestedCommentRepository.findByCommentId(commentEntity);

            for(NestedComment nestedCommentEntity : nestedCommentList){
                // 5-1. nested_comment DTO 생성
                PostDto.NestedCommentElement nestedCommentElement = new PostDto.NestedCommentElement();

                // 5-2. nested_comment DTO에 nested_comment entity를 DTO로 변환후 저장
                nestedCommentElement = modelMapper.map(nestedCommentEntity, PostDto.NestedCommentElement.class);

                // 5-3. nested_comment DTO에 entity를 DTO로 변환후 CustomMemberForComment 저장
                nestedCommentElement.setCustomMemberForComment(modelMapper.map(nestedCommentEntity.getMemberId(), PostDto.CustomMemberForComment.class));

                // 5-4. nested_comment DTO에 nested_comment_like count 저장
                nestedCommentElement.setNestedCommentLikeCount(nestedCommentLikeRepository.countByNestedCommentId(nestedCommentEntity));

                // nested_comment List에 add
                nestedCommentElementList.add(nestedCommentElement);
            }

            // Comment Element의 요소인 nestedCommentList를 저장
            commentElement.setNestedCommentList(nestedCommentElementList);

            // commentElement List에 add
            commentElementList.add(commentElement);

            //commentCombine(자세한 구조는 PostDto.CommentCombine 참고)에 commentElementList 저장
            commentCombine.setCommentElementList(commentElementList);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("postCombine", postCombine);
        response.put("commentCombine", commentCombine);

        return response;
    }

    //포럼 게시글 좋아요 - 정상 동작
    public void addPostLike(Long memberId, Long postId){

        //postLike Entity의 존재 확인을 위해 Member Entity와 Post Entity를 찾아온다.
        Member memberEntity = memberService.getById(memberId);
        Post postEntity = postRepository.findById(postId).get();

        //member Entity와 post Entity로 구성된 postLike Entity가 있는지 확인하고, 없으면 저장하기 위한 postLikeEntity
        PostLike postLikeEntityFind = postLikeRepository.findByMemberIdAndPostId(memberEntity, postEntity);
        PostLike postLikeEntitySave = new PostLike(memberEntity, postEntity);

        //member Entity와 post Entity로 구성된 post like가 있는지 보고 없으면 추가해주고, 있으면 지운다.
        if(postLikeEntityFind == null) postLikeRepository.save(postLikeEntitySave);
        else postLikeRepository.delete(postLikeEntityFind);

    }

    //포럼 게시글 댓글 작성 - 정상 동작
    public void addPostComment(Long memebrId, Long postId, String content){
        //준비물 준비 : memebr Entity, post Entity,
        Member memberEntity = memberService.getById(memebrId);
        Post postEntity = postRepository.findById(postId).get();

        //PostCommentRepository에 저장하기 위핸 PostComment Entity 준비 및 저장
        Comment commentEntitySave = new Comment(postEntity, memberEntity, content, (byte) 0, LocalDateTime.now());
        commentRepository.save(commentEntitySave);
    }

    //포럼 댓글 좋아요 - 정상 동작
    public void addPostCommentLike(Long memberId, Long commentId){
        //CommentLike Entity의 존재 확인을 위해 Member Entity와 Comment Entity를 찾아온다.
        Member memberEntity = memberService.getById(memberId);
        Comment commentEntity = commentRepository.findById(commentId).get();

        //Member Entity와 Comment Entity로 구성된 postLike Entity가 있는지 확인하고, 없으면 저장하기 위한 postLikeEntity
        CommentLike commentLikeFind = commentLikeRepository.findByMemberIdAndCommentId(memberEntity, commentEntity);
        CommentLike commentLikeSave = new CommentLike(memberEntity, commentEntity);

        //member Entity와 Comment Entity로 구성된 post like가 있는지 보고 없으면 추가해주고, 있으면 지운다.
        if(commentLikeFind == null)commentLikeRepository.save(commentLikeSave);
        else commentLikeRepository.delete(commentLikeFind);
    }

    //댓글 삭제 - 정상 동작 - 대댓글 없을 때 있을 때 나눠서 작업해야 -> 했고 확인해야함
    @Transactional
    public void removePostComment(Long commentId){
        //Comment entity 가져옴
        Optional<Comment> commentEntity = commentRepository.findById(commentId);
        int nestedCommentCount = nestedCommentRepository.countByCommentId(commentEntity.get());
        //Comment entity 내용 수정 후 저장
        // comment 존재 & nested comment 존재 시
        if(commentEntity.isPresent() && nestedCommentCount > 0){
            commentEntity.get().setIsDeleted((byte) 1);
            commentEntity.get().setContent("삭제된 댓글 입니다");
        }
        // comment 만 존재 시 -> 삭제
        else if(commentEntity.isPresent()){
            commentRepository.deleteById(commentEntity.get().getId());
        }
    }

    //대댓글 작성 - 정상 동작
    public void addPostNestedComment(Long memebrId, Long commentId, String content){
        //준비물 준비 : memebr Entity, comment Entity,
        Member memberEntity = memberService.getById(memebrId);
        Comment commentEntity = commentRepository.findById(commentId).get();

        //PostCommentRepository에 저장하기 위핸 PostComment Entity 준비 및 저장
        NestedComment nestedCommentEntitySave = new NestedComment(commentEntity, memberEntity, content, LocalDateTime.now());
        nestedCommentRepository.save(nestedCommentEntitySave);
    }

    //대댓글 좋아요 - 정상 동작
    public void addPostNestedCommentLike(Long memberId, Long nestedCommentId){
        //NestedCommentLike entity의 존재 확인을 위해 Member entity와 NestedComment entity를 찾아온다.
        Member memberEntity = memberService.getById(memberId);
        NestedComment nestedCommentEntity = nestedCommentRepository.findById(nestedCommentId).get();

        //member Entity와 nestedComment Entity로 구성된 nestedCommentLike Entity가 있는지 확인하고, 없으면 저장하기 위한 NestedCommentLike를 만듦
        NestedCommentLike nestedCommentLikeFind = nestedCommentLikeRepository.findByMemberIdAndNestedCommentId(memberEntity, nestedCommentEntity);
        NestedCommentLike nestedCommentLikeSave = new NestedCommentLike(memberEntity, nestedCommentEntity);

        //Member Entity와 NestedComment로 구성된 NestedCommentLike가 있는지 보고 없으면 추가해주고, 있으면 지운다.
        if(nestedCommentLikeFind == null) nestedCommentLikeRepository.save(nestedCommentLikeSave);
        else nestedCommentLikeRepository.delete(nestedCommentLikeFind);
    }

    //대댓글 삭제 - 정상 동작
    public void removePostNestedComment(Long nestedCommentId){
        //NestedComment entity를 가져옴
        Optional<NestedComment> nestedComment = nestedCommentRepository.findById(nestedCommentId);

        //NestedComment entity 삭제
        if(nestedComment.isPresent()){
            nestedCommentRepository.delete(nestedComment.get());
        }
    }

    public List<Post> getAllByUserId(Member member) {
        return postRepository.findAllByMemberId(member);
    }

    public List<Post> getAllByUserIds(List<Long> memberIds) {
        return postRepository.findAllByMemberIdIn(memberIds);
    }


    public Map<String, String> createPostFile(MultipartFile multipartFile, String dirName) throws IOException {
        return awsS3Uploader.createPostFile(multipartFile, dirName);
    }
}
