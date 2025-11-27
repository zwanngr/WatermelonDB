import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native'
import { runWatermelonDemo } from './demo'

export default function WatermelonDemo() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const triggerDemo = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      runWatermelonDemo()
      // const demoResult = await runWatermelonDemo()
      // console.log('%c WechatLibTurboModuleLogger demoResult:', 'color: #0e93e0;background: #aaefe5;', demoResult);
      // setResult(demoResult)
    } catch (err) {
      const message = err instanceof Error ? err.message : JSON.stringify(err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    triggerDemo()
  }, [triggerDemo])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>WatermelonDB 示例</Text>
        <Text style={styles.subtitle}>
          展示本地 Blog/Post 数据的创建、审核与同步流程
        </Text>

        {/* <Pressable style={[styles.button, loading && styles.buttonDisabled]} onPress={triggerDemo} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? '执行中…' : '重新运行 Demo'}</Text>
        </Pressable> */}

        {loading && <ActivityIndicator size="small" color="#007aff" style={styles.loader} />}
        {error && <Text style={styles.errorText}>出错：{error}</Text>}

        {result && (
          <>
            <SnapshotCard title="审核前" snapshot={result.beforeModeration} />
            <SnapshotCard title="审核后" snapshot={result.afterModeration} />
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>数据来自 `example/src/WatermelonDB/demo.ts`</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


function SnapshotCard({ title, snapshot }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <InfoRow label="Blog 名称" value={snapshot.blogName} />
      <InfoRow label="文章总数" value={snapshot.totalPosts.toString()} />
      <InfoRow label="需审核数量" value={snapshot.nastyPosts.toString()} />
      <InfoRow label="第一篇正文" value={snapshot.firstPostBody} />
    </View>
  )
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value ?? '—'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1a2d',
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#b0c4de',
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#1f8ef1',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loader: {
    marginTop: 12,
  },
  errorText: {
    marginTop: 12,
    color: '#ff6961',
  },
  card: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#14243a',
    borderWidth: 1,
    borderColor: '#1d3557',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rowLabel: {
    color: '#b0c4de',
  },
  rowValue: {
    color: '#fff',
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'right',
  },
  footer: {
    marginTop: 24,
  },
  footerText: {
    color: '#5b708b',
    fontSize: 12,
    textAlign: 'center',
  },
})

