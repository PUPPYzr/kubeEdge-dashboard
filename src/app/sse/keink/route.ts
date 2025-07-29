// src/app/sse/keink/route.ts
export const dynamic = 'force-dynamic';   // 👈 关键：拒绝静态生成

import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const upstreamRes = await fetch(`${process.env.API_SERVER}/keink/run`, {
    headers: {
      Accept: 'text/event-stream',
    },
  });

  if (!upstreamRes.body) {
    writer.write(encoder.encode('event: error\ndata: Upstream has no body\n\n'));
    writer.close();
    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }

  const reader = upstreamRes.body.getReader();

  (async () => {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        writer.write(value); // 写入原始数据（SSE格式）
      }
    }
    writer.close();
  })();

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
