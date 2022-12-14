import { noticeType, notice } from '../services/interfaces/noticeInterface';
import { pg } from '../app';
import { QueryResult } from 'pg';

export class NoticeModel {
  //공지사항 생성
  async createNotice(notice: noticeType): Promise<noticeType[]> {
    const { title, content } = notice;
    const row = await pg.query(
      'INSERT INTO notice (title,content) VALUES($1,$2) RETURNING *',
      [title, content]
    );

    return row.rows;
  }
  //공지사항 조회
  async findNotice(id: number): Promise<noticeType[]> {
    const row = await pg.query('SELECT * FROM notice WHERE id =($1)', [id]);
    return row.rows;
  }
  //공지사항 전체 조회
  async findAll(): Promise<noticeType[]> {
    const row = await pg.query('SELECT * FROM notice');
    return row.rows;
  }

  //공지사항 업데이트
  async update(id: number, notice: noticeType): Promise<noticeType[]> {
    const { title, content } = notice;
    return await pg
      .query('UPDATE notice SET title=($1),content=($2) WHERE id=($3)', [
        title,
        content,
        id,
      ])
      .then(() => this.findNotice(id));
  }

  //공지사항 삭제

  async delete(id: number): Promise<noticeType[]> {
    const row = await pg.query('DELETE FROM notice WHERE id = ($1)', [id]);
    return row.rows;
  }
}

export const noticeModel = new NoticeModel();
