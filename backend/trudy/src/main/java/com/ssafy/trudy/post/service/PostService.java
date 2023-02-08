package com.ssafy.trudy.post.service;

import com.ssafy.trudy.etc.repository.SigunguRepository;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.repository.IntroduceRepository;
import com.ssafy.trudy.member.repository.MemberRepository;
import com.ssafy.trudy.member.service.MemberService;
import com.ssafy.trudy.post.model.*;
import com.ssafy.trudy.post.repository.*;
import io.jsonwebtoken.impl.crypto.MacProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

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
    private final PostAwsS3Service postAwsS3Service;
    ModelMapper modelMapper = new ModelMapper();

    //포럼 게시글 목록 가져오기
    public List<PostDto.PostCombine> findPostList(){
        log.info("============Post Service / findPostList==========");

//        log.info("postEntity=========== " + postRepository.findById(1L).get().toString());
//        log.info("postEntity=========== " + postRepository.findById(2L).get().toString());
//        log.info("postEntity=========== " + postRepository.findById(3L).get().toString());
        //Post Entity를 담을 리스트(post Entity로 postImage, postArea, postCategory, postLikeCount를 검색해서 가져옴)
        List<Post> postEntityList = postRepository.findAll();
        //log.info("postEntity=========== " + postEntityList.toString());


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

        return postCombineList;
    }

    //포럼 게시글 작성
    public void addPost(/*String title,
                        String content,
                        *//*MultipartFile[] upload,*//*
                        Long[] sigunguIdList,
                        Long memberId,
                        CategoryName[] categoryList*/
                         PostDto.InsertPost insertPostDto){
        //entity화를 한다 -> 저장한다(posts먼저 새기고 id 가져와서 나머지 애들 새긴다.)

        //1. post entity 만들어서 저장 후 id 가져오기 -> thumbnail 은 나중에 따로 추가
        Post postEntityInsert = new Post(memberService.getById(insertPostDto.getMemberId()),
                insertPostDto.getTitle(),
                insertPostDto.getContent());
        postRepository.save(postEntityInsert);
        log.info("postId test ======= " + postEntityInsert);

        //2. image, category, area 저장
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
        for(CategoryName categoryName : insertPostDto.getCategoryList()){
            PostCategory postCategory = PostCategory.builder()
                    .postId(postEntityInsert)
                    .categoryName(categoryName).build();
            postCategoryList.add(postCategory);
        }
        postCategoryRepository.saveAll(postCategoryList);

        //3. thumbnail 이미지 저장
        postEntityInsert.setThumbnailImage("test");


        log.info("썸네일 테스트 ======== " + postEntityInsert.toString());
    }

    //포럼 게시글 수정 - ck에디터와 연관
    @Transactional
    public void modifyPost(Long postId, /*String title, String content, *//*MultipartFile[] upload,*//*
                           Long[] sigunguIdList, CategoryName[] categoryList*/
                            PostDto.InsertPost insertPostDto){
        // post는 수정, postImage, postArea, postCategory는 삭제 후 다시 저장
            //사진 보류
            //사진 post entity로 검색 -> 리스트 가져오고 디비에 삭제 -> aws 사진 삭제
            Post postEntityFind = postRepository.findById(postId).get();

            // 사진 리스트 가져오기
            List<PostImage> imageListForDelete = postImageRepository.findByPostId(postEntityFind);
            //List<String> imageEntityFileName = imageListForDelete.stream().map(p -> p.)

        // PostArea, PostCategory 삭제
        postAreaRepository.deleteByPostId(postEntityFind);
        postCategoryRepository.deleteByPostId(postEntityFind);

        // PostArea, PostCategory 저장
        List<PostArea> postAreaList = new ArrayList<>();
        for(Long sigunguid : insertPostDto.getSigunguIdList()){
            PostArea postArea = PostArea.builder()
                    .postId(postEntityFind)
                    .sigunguCode(sigunguRepository.findById(sigunguid).get())
                    .build();
            postAreaList.add(postArea);
        }
        postAreaRepository.saveAll(postAreaList);

        List<PostCategory> postCategoryList = new ArrayList<>();
        for(CategoryName categoryName : insertPostDto.getCategoryList()){
            PostCategory postCategory = PostCategory.builder()
                    .postId(postEntityFind)
                    .categoryName(categoryName).build();
            postCategoryList.add(postCategory);
        }
        postCategoryRepository.saveAll(postCategoryList);

        //post entity 수정(comment 때문에 post 삭제 안함)
        postEntityFind.setTitle(insertPostDto.getTitle());
        postEntityFind.setContent(insertPostDto.getContent());

        log.info("put 완료");
    }

    //포럼 게시글 삭제 - 정상 동작
    public void removePost(Long postId){
        postRepository.deleteById(postId);
    }

    //포럼 게시글 상세보기(게시글 + 댓글) - 정상 동작
    public Map /*Optional<Post>*/ findPostDetail(Long postId) throws Exception{

        //1. post entity를 가져옴
        log.info("1");
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

        // post detail test
//        log.info("postCombine =========== " );
//        log.info("PostElement =========== " + postCombine.getPostElement());
//        log.info("MemberElement =========== " + postCombine.getMemberElement());
//        log.info("PostImageElementList =========== " + postCombine.getPostImageElementList());
//        log.info("PostAreaElementList=========== " + postCombine.getPostAreaElementList());
//        log.info("PostCategoryElementList =========== " + postCombine.getPostCategoryElementList());
//        log.info("PostLikeCount =========== " + postCombine.getPostLikeCount());



         /* commentElementList 채우기
            post entity를 가져옴
        comments entity 를 전부 구해옴
        해당 comments entity로
        -> comment_like count를 구한다, nested_comment entity를 구해옴
            -> nested_comment entity로 nested_comment like count를 구해온다
         */

        // post Entity를 이용해 댓글 정보를 채워 넣음
        PostDto.CommentCombine commentCombine = new PostDto.CommentCombine();

        // 댓글 정보만 채우기
//        PostDto.CommentElement commentElement = modelMapper.map(commentRepository.findByPostId(postEntity), PostDto.CommentElement.class);

        // comment entity List 가져옴
        List<Comment> commentEntityList = commentRepository.findByPostId(postEntity);
        //log.info("1번 글 댓글 ========= " + commentEntityList);

        List<PostDto.CommentElement> commentElementList = new ArrayList<>();

        //for(comment entity 갯수) {comment_like count를 구한다 + {nested_comment entity를 구한다. + nested_comment_like count를 구한다.}}
        for(Comment commentEntity : commentEntityList){
            //1. Comment DTO 생성
            PostDto.CommentElement commentElement = new PostDto.CommentElement();

            //2. Comment DTO에 Comment entity를 DTO로 변환후 저장
            commentElement = modelMapper.map(commentEntity, PostDto.CommentElement.class);

            //3. Comment DTO에 entity를 DTO로 변환후 CustomMemberForComment 저장
            commentElement.setCustomMemberForComment(modelMapper.map(commentEntity.getPostId().getMemberId(), PostDto.CustomMemberForComment.class));

            //4. comment DTO에 comment_like count 저장
            commentElement.setCommentLikeCount(commentLikeRepository.countByCommentId(commentEntity));

            //log.info("commentElement res ============== " + commentElement.toString());

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

        // comment DTO 정보 test
//        for(PostDto.CommentElement commentElement : commentElementList){
//            log.info("result ==================== " );
//            log.info("id ========= " + commentElement.getId());
//            log.info("conent ========= " + commentElement.getContent());
//            log.info("isdeleted ========= " + commentElement.getIsDeleted());
//            log.info("created at========= " + commentElement.getCreatedAt());
//            log.info("custom member for comment ========= " + commentElement.getCustomMemberForComment());
//            log.info("nestedcommentlist ========= " + commentElement.getNestedCommentList());
//        }

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

}
// 포스트 서비스에서
// 포스트이미지 repository에 save하잖아.
// s3 서비스에서 먼저 s3 저장하고 그 저장된 결과에 따라 response를 활용해서 포스트이미지 repository에 save

// 프론트입장에서는 /api/post/upload 먼저함 -> post_image 테이블 insert
// /api/post/ 해서 먼저 만든