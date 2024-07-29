# the minimum version of CMake.
cmake_minimum_required(VERSION 3.4.1)
project(myNpmLib)

set(NATIVERENDER_ROOT_PATH ${CMAKE_CURRENT_SOURCE_DIR})

if(DEFINED PACKAGE_FIND_FILE)
    include(${PACKAGE_FIND_FILE})
endif()


include_directories(
                    ${NATIVERENDER_ROOT_PATH}/include/httplib/httplib.h
                    ${NATIVERENDER_ROOT_PATH}
                    ${NATIVERENDER_ROOT_PATH}/include)

add_library(library SHARED napi_init.cpp)
target_link_libraries(library PUBLIC  librawfile.z.so libace_napi.z.so libohweb.so libhilog_ndk.z.so)
target_link_libraries(library PUBLIC
      ${NATIVERENDER_ROOT_PATH}/../../../libs/${OHOS_ARCH}/libcrypto.so
      ${NATIVERENDER_ROOT_PATH}/../../../libs/${OHOS_ARCH}/libssl.so
)
