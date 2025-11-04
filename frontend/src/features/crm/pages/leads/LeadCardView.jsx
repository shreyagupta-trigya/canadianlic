import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconDotsVertical, IconMail, IconPhone } from "@tabler/icons-react";

const LeadCardView = ({ leads, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {leads.map((lead) => (
        <Card key={lead.ROWID} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {lead.firstName?.[0]}{lead.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    {lead.firstName} {lead.lastName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{lead.companyName}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <IconDotsVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant={lead.leadStatus === 'New' ? 'default' : 'secondary'}>
                {lead.leadStatus}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(lead.date).toLocaleDateString()}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <IconMail className="h-4 w-4 text-muted-foreground" />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <IconPhone className="h-4 w-4 text-muted-foreground" />
                <span>{lead.phone}</span>
              </div>
            </div>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => onViewDetails(lead)}>
                View Details
              </Button>
              <Button variant="outline" size="sm" onClick={() => onEdit(lead)}>
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeadCardView;
