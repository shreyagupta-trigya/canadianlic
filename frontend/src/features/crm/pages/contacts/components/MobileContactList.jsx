import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const MobileContactList = ({ contacts, showAndHideState }) => {
  return (
    <div className="space-y-4 p-4">
      {contacts.map((contact, index) => (
        <Card key={contact.ROWID || index} className="border-b">
          <CardContent className="flex items-start justify-between p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {`${contact.firstName?.[0] || ''}${contact.lastName?.[0] || ''}`}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">
                  {`${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'N/A'}
                </h3>
              </div>
              {contact.mobile && (
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-red-500 border-red-200">
                    {contact.mobile}
                  </Badge>
                </div>
              )}
              {contact.email && (
                <p className="text-sm text-gray-500">{contact.email}</p>
              )}
              {contact.insuranceLeadsSource && (
                <p className="text-sm text-gray-500">{contact.insuranceLeadsSource}</p>
              )}
            </div>
            {showAndHideState.previewButton && (
              <Link 
                to={`/contactview/${contact.contactROWID}`}
                className="shrink-0"
              >
                <Avatar className="h-14 w-14">
                  <AvatarImage 
                    src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" 
                    alt="Contact avatar" 
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MobileContactList;
