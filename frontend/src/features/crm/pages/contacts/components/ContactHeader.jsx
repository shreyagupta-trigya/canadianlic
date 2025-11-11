import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Search,
  RotateCcw,
  MoreHorizontal,
  Settings,
  Plus,
  Upload,
  Download,
  Mail,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ContactHeader = ({
  showAndHideState,
  onSearchClick,
  onMassUpdateClick,
  onMassEmailClick,
  onExportClick,
  onColumnManageClick,
  onResetClick,
  onDeleteSelectedClick,
  selectedContacts
}) => {
  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onSearchClick}
        >
          <Search className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onResetClick}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        
          <Button >
            <Link to="/crm/contacts/create">
            <div className='flex'>

              <Plus className="h-4 w-4 mr-2" />
              New
            </div>
            </Link>
          </Button>
             </div>

      <div className="flex items-center space-x-2">
    
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {selectedContacts.length > 0 && (
                <DropdownMenuItem onClick={onDeleteSelectedClick}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </DropdownMenuItem>
              )}
              {showAndHideState?.['import'] && (
                <DropdownMenuItem>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </DropdownMenuItem>
              )}
              {showAndHideState?.['export'] && (
                <DropdownMenuItem onClick={onExportClick}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={onMassUpdateClick}>
                <Edit className="h-4 w-4 mr-2" />
                Mass Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onMassEmailClick}>
                <Mail className="h-4 w-4 mr-2" />
                Mass Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onColumnManageClick}>
              Manage Columns
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ContactHeader;
