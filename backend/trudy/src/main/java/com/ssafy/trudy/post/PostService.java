package com.ssafy.trudy.post;

import com.ssafy.trudy.post.model.Post;
import com.ssafy.trudy.post.model.PostArea;
import com.ssafy.trudy.post.model.PostCategory;
import com.ssafy.trudy.post.model.PostDto;
import com.ssafy.trudy.post.repository.PostAreaRepository;
import com.ssafy.trudy.post.repository.PostCategoryRepository;
import com.ssafy.trudy.post.repository.PostImageRepository;
import com.ssafy.trudy.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostAreaRepository postAreaRepository;
    private final PostCategoryRepository postCategoryRepository;
    private final PostImageRepository postImageRepository;

    //포럼 게시글 목록 가져오기
    public List<Post> findPostList(){
        List<Post> post = postRepository.findAll();
        log.info(post.get(0).toString());
        return post;
    }

    //포럼 게시글 작성
    public void addPost(PostDto.PostInsertRequest postDetailRequest){
        // dto안에 dto를 각각 접근하여 entity화를 한다 -> 저장한다(posts먼저 새기고 id 가져와서 나머지 애들 새긴다.)


    }

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
