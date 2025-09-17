import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Community: React.FC = () => {
  const posts = [
    {
      id: '1',
      author: 'Mary K.',
      title: 'Successfully treated bean rust!',
      content: 'Used the AI recommendation and my beans are recovering well.',
      likes: 45,
      replies: 12,
      verified: true,
      time: '2 hours ago'
    },
    {
      id: '2',
      author: 'Peter M.',
      title: 'Best maize varieties for Mukono?',
      content: 'Looking for drought-resistant varieties for next season.',
      likes: 23,
      replies: 8,
      verified: false,
      time: '5 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <i className="fas fa-users text-accent mr-2"></i>
            Community Forum
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{post.title}</h3>
                    {post.verified && <Badge variant="default" className="bg-success">Verified</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{post.author} • {post.time}</p>
                </div>
              </div>
              <p className="text-sm mb-3">{post.content}</p>
              <div className="flex items-center space-x-4 text-sm">
                <Button variant="ghost" size="sm">
                  <i className="fas fa-heart mr-1"></i> {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <i className="fas fa-comment mr-1"></i> {post.replies}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Community;