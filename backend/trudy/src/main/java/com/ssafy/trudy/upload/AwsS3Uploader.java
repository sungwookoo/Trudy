package com.ssafy.trudy.upload;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.auth.service.MemberAppService;
import com.ssafy.trudy.member.model.dto.MemberResponse;
import com.ssafy.trudy.planner.model.DayItem;
import com.ssafy.trudy.planner.service.PlannerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Log4j2
@RequiredArgsConstructor
@Component
public class AwsS3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Autowired
    private final PlannerService plannerService;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    // 여기서 만들고
    public String createFile(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)        // 파일 생성
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));

        return upload(uploadFile, dirName);
    }

    // 여기서 보낸다
    private String upload(File uploadFile, String dirName) {
        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);    // s3로 업로드
        removeNewFile(uploadFile);

        return uploadImageUrl;
    }

    public Map<String, String> createMemberFile(MultipartFile multipartFile, String dirName, PrincipalDetails principal) throws IOException {
        File uploadFile = convert(multipartFile)        // 파일 생성
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));

        return memberUpload(uploadFile, dirName, principal);
    }
    public Map<String, String> memberUpload(File uploadFile, String dirName, PrincipalDetails principal) {
        Map<String, String> map = new HashMap<>();
        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);    // s3로 업로드
        map.put("fileName",fileName);
        map.put("imageUrl",uploadImageUrl);
        removeNewFile(uploadFile);
        delete(principal.getMember().getImageFileName());
        return map;
    }

    public Map<String, String> createPostFile(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)        // 파일 생성
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));

        return postUpload(uploadFile, dirName);
    }
    public Map<String, String> postUpload(File uploadFile, String dirName) {
        Map<String, String> map = new HashMap<>();
        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);    // s3로 업로드
        map.put("fileName",fileName);
        map.put("imageUrl",uploadImageUrl);
        removeNewFile(uploadFile);
        return map;
    }

    public DayItem createCustomDayItemFile(MultipartFile multipartFile, String dirName, Long dayItemId) throws IOException {
        File uploadFile = convert(multipartFile)        // 파일 생성
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));

        return customDayItemUpload(uploadFile, dirName, dayItemId);
    }

    // 생성된 DayItemImage S3 업로드 및 DayItem의 이미지 URL, 이미지 파일이름 갱신
    public DayItem customDayItemUpload(File uploadFile, String dirName, Long dayItemId) {
        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);    // s3로 업로드
        removeNewFile(uploadFile);
        delete(plannerService.getDayItemById(dayItemId).getCustomImageFileName());

        return plannerService.saveDayItemImage(uploadImageUrl, fileName, dayItemId);


    }

    // 1. 로컬에 파일생성
    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }

    // 2. S3에 파일업로드
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        log.info("File Upload : " + fileName);
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 3. 로컬에 생성된 파일삭제
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("File delete success");
            return;
        }
        log.info("File delete fail");
    }
    public void delete(String fileName) {
        if (fileName == null) {
            return;
        }
        boolean isExistObject = amazonS3Client.doesObjectExist(bucket, fileName);
        if(isExistObject) {
            log.info("File Delete : " + fileName);
            amazonS3Client.deleteObject(bucket, fileName);
        }
    }


//    public void delete(String fileName) {
//        boolean isExistObject = amazonS3Client.doesObjectExist(bucket, fileName);
//        if(isExistObject) {
//            log.info("File Delete : " + fileName);
//            amazonS3Client.deleteObject(bucket, fileName);
//        }
//    }
}