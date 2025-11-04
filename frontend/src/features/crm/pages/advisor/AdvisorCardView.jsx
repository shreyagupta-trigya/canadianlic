import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconDotsVertical, IconMail, IconPhone } from "@tabler/icons-react";

const AdvisorCardView = ({ advisors, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {advisors.map((advisor) => (
        <Card key={advisor.ROWID} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {advisor.firstName?.[0]}{advisor.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    {advisor.firstName} {advisor.lastName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{advisor.accountName}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <IconDotsVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant={advisor.contactType === 'Individual' ? 'default' : 'secondary'}>
                {advisor.contactType}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(advisor.createdTime).toLocaleDateString()}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <IconMail className="h-4 w-4 text-muted-foreground" />
                <span>{advisor.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <IconPhone className="h-4 w-4 text-muted-foreground" />
                <span>{advisor.phone}</span>
              </div>
            </div>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => onViewDetails(advisor)}>
                View Details
              </Button>
              <Button variant="outline" size="sm" onClick={() => onEdit(advisor)}>
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdvisorCardView;
