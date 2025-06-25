import { AppText } from '@/components/AppText';
import { formatToKoreanDate } from '@/constants/Day';
import {
  useDeleteMemo,
  useGetMemo,
  usePostMemo,
  usePostMemoWidget,
  usePutMemo,
} from '@/hooks/query/memo.query';
import { useAuthStore } from '@/store/authStore';
import {
  AntDesign,
  EvilIcons,
  Ionicons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActionSheetIOS,
  Alert,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ThirdScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();
  const coupleId = user?.coupleId;
  const { postWidgetMemo } = usePostMemoWidget();
  const { data } = useGetMemo(coupleId);
  const memo = data?.memo ?? [];
  const { deleteMemo } = useDeleteMemo();
  const { putMemo } = usePutMemo();
  const { postMemo } = usePostMemo();
  const [isCreating, setIsCreating] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState<{
    id: number;
    content: string;
    user: { nickname: string };
    createdAt: string;
    isWidgetMemo: boolean;
  } | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  const showActionSheet = () => {
    if (!selectedMemo) return;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['취소', '수정', '삭제'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 2,
        userInterfaceStyle: isDark ? 'dark' : 'light',
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          setIsEditing(true);
          setEditedContent(selectedMemo.content);
        } else if (buttonIndex === 2) {
          deleteMemo({ coupleId, memoId: selectedMemo.id });
          closeModal();
        }
      }
    );
  };

  const openModal = (item: (typeof memo)[0]) => {
    setSelectedMemo(item);
    setIsEditing(false); // 항상 초기화
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMemo(null);
    setIsEditing(false);
    setIsCreating(false); // ← 꼭 추가!
    setEditedContent('');
  };

  return (
    <SafeAreaView
      edges={['top']}
      className={`flex-1 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <View className='flex-row justify-between items-center mb-4'>
        <Text
          className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          Memo
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true);
            setIsCreating(true);
            setEditedContent('');
            setSelectedMemo(null); // 기존 메모 선택 해제
            setIsEditing(true); // 작성도 수정처럼 인풋 사용
          }}
        >
          <AntDesign name='plus' size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={memo}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
        contentContainerStyle={{ paddingBottom: 32 }}
        renderItem={({ item }) => {
          const writeDate = formatToKoreanDate(item.createdAt);
          return (
            <Pressable
              onPress={() => openModal(item)}
              className='w-[48%] aspect-square bg-[#c3d2b8] p-4 rounded-md'
            >
              <View className='flex-row justify-between'>
                <Text className='text-xs text-gray-500 dark:text-gray-300 mb-1'>
                  {item.user.nickname}
                </Text>
                <Text className='text-xs text-gray-500 dark:text-gray-300 mb-1'>
                  {writeDate}
                </Text>
              </View>
              <Text className='text-sm text-black dark:text-white'>
                {item.content}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* 모달 */}
      <Modal
        visible={isModalVisible}
        animationType='slide'
        transparent
        onRequestClose={closeModal}
      >
        <View className='flex-1'>
          <View className='bg-white dark:bg-black rounded-t-2xl p-6 h-[100%] rounded-xl'>
            <View className='flex-1 justify-between'>
              <View className='flex-col'>
                <View className='flex-row items-center justify-between mt-10'>
                  <TouchableOpacity
                    onPress={() => {
                      // 작성 중일 때: 작성 취소 Alert
                      if (isCreating) {
                        Alert.alert('작성 취소', '작성을 취소하시겠습니까?', [
                          { text: '아니오', style: 'cancel' },
                          {
                            text: '네',
                            onPress: closeModal,
                            style: 'destructive',
                          },
                        ]);
                        return;
                      }

                      // 수정 중일 때: 수정 취소 Alert
                      if (isEditing) {
                        Alert.alert('수정 취소', '수정을 취소하시겠습니까?', [
                          { text: '아니오', style: 'cancel' },
                          {
                            text: '네',
                            onPress: closeModal,
                            style: 'destructive',
                          },
                        ]);
                        return;
                      }

                      // 기존 메모 조회 시: 수정/삭제 액션 시트
                      showActionSheet();
                    }}
                  >
                    {isCreating || isEditing ? (
                      <SimpleLineIcons
                        name='arrow-left'
                        size={16}
                        color={isDark ? 'white' : 'black'}
                        className='p-1'
                      />
                    ) : (
                      <AntDesign
                        name='ellipsis1'
                        size={28}
                        color={isDark ? 'white' : 'black'}
                      />
                    )}
                  </TouchableOpacity>

                  <View className='flex-col'>
                    <AppText className='text-2xl font-logo'>Our</AppText>
                    <AppText className='text-2xl font-logo mt-[-12px]'>
                      Own
                    </AppText>
                  </View>

                  {/* 오른쪽 버튼 */}
                  <TouchableOpacity
                    onPress={() => {
                      if (isCreating) {
                        Alert.alert('작성 확인', '작성을 완료하시겠습니까?', [
                          { text: '아니오', style: 'cancel' },
                          {
                            text: '네',
                            onPress: () => {
                              postMemo({ coupleId, content: editedContent });
                              closeModal();
                            },
                          },
                        ]);
                      } else if (isEditing && selectedMemo) {
                        Alert.alert('수정 확인', '수정하시겠습니까?', [
                          { text: '아니오', style: 'cancel' },
                          {
                            text: '네',
                            onPress: () => {
                              if (coupleId) {
                                putMemo({
                                  coupleId,
                                  memoId: selectedMemo.id,
                                  content: editedContent,
                                });
                                closeModal();
                              }
                            },
                          },
                        ]);
                      } else {
                        closeModal();
                      }
                    }}
                  >
                    {isEditing ? (
                      <Ionicons
                        name='checkmark-outline'
                        size={24}
                        color={isDark ? 'white' : 'black'}
                      />
                    ) : (
                      <EvilIcons
                        name='close'
                        size={28}
                        color={isDark ? 'white' : 'black'}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <View className='border border-[#b5b5b5] mt-10 p-4 h-[400px] rounded-xl'>
                  {(selectedMemo || isCreating) && (
                    <View className='flex-1'>
                      {!isCreating && !isEditing && selectedMemo && (
                        <View className='flex-row justify-between mb-3'>
                          <AppText className='text-sm'>
                            {selectedMemo.user.nickname}
                          </AppText>
                          <AppText className='text-gray-400 text-sm'>
                            {formatToKoreanDate(selectedMemo.createdAt)}
                          </AppText>
                        </View>
                      )}

                      {isEditing ? (
                        <View className='flex-col'>
                          <View className='flex-row justify-between mb-2'>
                            {/* 작성자 */}
                            <AppText className='text-sm text-gray-400'>
                              {isCreating
                                ? user?.nickname
                                : selectedMemo?.user.nickname}
                            </AppText>

                            {/* 작성 시간 */}
                            <AppText className='text-sm text-gray-400'>
                              {isCreating
                                ? formatToKoreanDate(new Date().toISOString())
                                : formatToKoreanDate(selectedMemo!.createdAt)}
                            </AppText>
                          </View>

                          <TextInput
                            multiline
                            value={editedContent}
                            onChangeText={setEditedContent}
                            style={{ padding: 0 }}
                            placeholder='메모를 입력해주세요'
                            placeholderTextColor={isDark ? '#aaa' : '#888'}
                          />
                        </View>
                      ) : (
                        <AppText>{selectedMemo?.content}</AppText>
                      )}
                    </View>
                  )}
                </View>
              </View>

              {!isEditing && (
                <TouchableOpacity
                  onPress={() => {
                    if (coupleId && selectedMemo) {
                      postWidgetMemo({ coupleId, memoId: selectedMemo.id });
                      closeModal();
                    }
                  }}
                  className='p-4 mb-10 rounded-xl bg-[#c8d2fe]'
                >
                  <AppText className='text-center text-sm'>
                    {selectedMemo?.isWidgetMemo
                      ? '홈 화면에서 제거하기'
                      : '홈 화면에 설정하기'}
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
