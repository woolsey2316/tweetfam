export interface Notification {
  _id: string;
  userId: string;
  data: {
    type: 'like' | 'comment' | 'follow';
    postId?: string;
    senderName: string;
    senderPicturePath: string;
    isRead: boolean;
    createdAt: string;
  }[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}
