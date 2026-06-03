import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUserList } from '@/api/user.ts';

interface UserItem {
  id: number;
  name: string;
  nickname: string;
}

const PAGE_SIZE = 10;

export default function UserScreen() {
  const [keyWord, setKeyWord] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 初始化表格数据（对应 User.vue 的 init）
  const init = useCallback(async (nextPage = page) => {
    setLoading(true);
    try {
      const res: any = await getUserList({
        keyWord,
        page: nextPage,
        pageSize: PAGE_SIZE,
      });
      const list = res?.data ?? res ?? [];
      setTableData(Array.isArray(list) ? list : []);
      setTotal(res?.total ?? (Array.isArray(list) ? list.length : 0));
    } catch (error) {
      console.log('getUserList error', error);
      setTableData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [keyWord, page]);

  useFocusEffect(
    useCallback(() => {
      init(1);
      setPage(1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const onSearch = () => {
    setPage(1);
    init(1);
  };

  const totalPage = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const changePage = (next: number) => {
    if (next < 1 || next > totalPage || next === page) {
      return;
    }
    setPage(next);
    init(next);
  };

  const renderItem = ({ item }: { item: UserItem }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.idCell]}>{item.id}</Text>
      <Text style={[styles.cell, styles.flexCell]}>{item.name}</Text>
      <Text style={[styles.cell, styles.flexCell]}>{item.nickname}</Text>
    </View>
  );

  return (
    <View style={styles.wrap}>
      {/* 搜索区域，对应 User.vue 顶部 input + 搜索按钮 */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          value={keyWord}
          onChangeText={setKeyWord}
          placeholder="请输入关键字"
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={onSearch}>
          <Text style={styles.searchBtnText}>搜索</Text>
        </TouchableOpacity>
      </View>

      {/* 表头 */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.idCell, styles.headerText]}>id</Text>
        <Text style={[styles.cell, styles.flexCell, styles.headerText]}>名字</Text>
        <Text style={[styles.cell, styles.flexCell, styles.headerText]}>昵称</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#666666" />
      ) : (
        <FlatList
          data={tableData}
          keyExtractor={(item, index) => String(item.id ?? index)}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>暂无数据</Text>}
        />
      )}

      {/* 分页，对应 User.vue 的 el-pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.pageBtn, page <= 1 && styles.pageBtnDisabled]}
          onPress={() => changePage(page - 1)}
          disabled={page <= 1}
        >
          <Text style={styles.pageBtnText}>上一页</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>
          {page} / {totalPage}（共 {total} 条）
        </Text>
        <TouchableOpacity
          style={[styles.pageBtn, page >= totalPage && styles.pageBtnDisabled]}
          onPress={() => changePage(page + 1)}
          disabled={page >= totalPage}
        >
          <Text style={styles.pageBtnText}>下一页</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdfe6',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  searchBtn: {
    marginLeft: 10,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#409eff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnText: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebeef5',
    paddingVertical: 12,
  },
  headerRow: {
    backgroundColor: '#f5f7fa',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebeef5',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#909399',
  },
  cell: {
    paddingHorizontal: 6,
    color: '#606266',
  },
  idCell: {
    width: 50,
  },
  flexCell: {
    flex: 1,
  },
  loading: {
    marginTop: 40,
  },
  empty: {
    textAlign: 'center',
    color: '#909399',
    marginTop: 40,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  pageBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#f4f4f5',
  },
  pageBtnDisabled: {
    opacity: 0.5,
  },
  pageBtnText: {
    color: '#606266',
  },
  pageInfo: {
    marginHorizontal: 16,
    color: '#606266',
  },
});
