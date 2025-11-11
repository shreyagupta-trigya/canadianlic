import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, RotateCcw, Settings, MoreHorizontal, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const PolicyHeader = ({
  selectedPolicies,
  selectedTableLayout,
  setSelectedTableLayout,
  onSearchClick,
  onMassUpdateClick,
  onMassEmailClick,
  onExportPolicy,
  onExportRRSP,
  onExportTFSA,
  onExportRESP,
  onExportVisa,
  onColumnManageClick,
  onResetClick,
  onDeleteSelectedClick,
  searchQuery,
  setSearchQuery,
  filteredItems,
  onItemClick
}) => {
  return (
    <div className="pb-0 mt-3 pe-2">
      <div className="d-flex justify-content-end align-items-center">
        <div style={{ position: 'relative' }}>
          <Button variant="outline" className="dropdown-toggle">
            Quick Actions
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="dropdown-toggle">
                Quick Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dropdown-menu-start dropdown-menu-lg-start" style={{ maxHeight: '250px', position: 'absolute', top: '21px', left: '0px', width: '300px', overflow: 'hidden' }}>
              <div className="search-container-div" style={{ padding: '10px' }}>
                <div className="search-container">
                  <Input
                    className="search-input"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    style={{ width: '100%', padding: '5px' }}
                  />
                </div>
              </div>
              <div className="dropdown-items-container" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {filteredItems.map((item, index) => (
                  <DropdownMenuItem key={index} onClick={() => onItemClick(item)}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <div className="col-md-4 col-sm-12 mt-2 mr-3 d-flex gap-2"
            style={{ position: 'absolute', left: '15px', width: '20rem', border: '2px solid #184e88', borderRadius: '10px', top: '-1px' }}>
            <Button variant="outline" className="px-2 py-0 border">
              Selected : {selectedPolicies.length}
            </Button>
            <select
              value={selectedTableLayout}
              onChange={(e) => setSelectedTableLayout(e.target.value)}
              className="multisteps-form__select form-control choices__input custom-btn btn w-50"
              style={{ border: 'none', background: 'transparent' }}
            >
              <option value="all">All</option>
              <option value="policies">Policies</option>
              <option value="investments">Investments</option>
            </select>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="row justify-content-center mx-1">
            <Button onClick={onSearchClick} variant="outline" className="btn search-btn-list">
              <Search className="cursor-pointer" />
            </Button>
          </div>
          <div className="row justify-content-center mx-1">
            <Button onClick={onResetClick} variant="outline" className="btn search-btn-list mb-0">
              <RotateCcw className="cursor-pointer" />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="new-btn-list btn-sm dropdown-toggle">
                <Plus className="me-1" />
                New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dropdown-menu-end">
              <DropdownMenuItem>
                <Link to="/policyformins" target="_blank">+ New Policy</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/investmentform" target="_blank">+ New Investment</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ellipsis-btn-list">
              <MoreHorizontal className="fs-6 mb-0 cursor-pointer m-0 text-bold fs-5 fw-bold" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dropdown-menu-end">
            {selectedPolicies.length > 0 && (
              <DropdownMenuItem onClick={onDeleteSelectedClick}>Delete All</DropdownMenuItem>
            )}
            <DropdownMenuItem>Import</DropdownMenuItem>
            <DropdownMenuItem onClick={onExportPolicy}>Export Policy</DropdownMenuItem>
            <DropdownMenuItem onClick={onExportRRSP}>Export RRSP</DropdownMenuItem>
            <DropdownMenuItem onClick={onExportTFSA}>Export TFSA</DropdownMenuItem>
            <DropdownMenuItem onClick={onExportRESP}>Export RESP</DropdownMenuItem>
            <DropdownMenuItem onClick={onExportVisa}>Export Visa</DropdownMenuItem>
            <DropdownMenuItem onClick={onMassUpdateClick}>Mass Update</DropdownMenuItem>
            <DropdownMenuItem onClick={onMassEmailClick}>Mass Email</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="btn btn-light border px-2 py-1">
              <Settings className="bi bi-sliders no-hover" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="shadow-sm" style={{ minWidth: '180px' }}>
            <DropdownMenuItem onClick={onColumnManageClick}>Manage Columns</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PolicyHeader;
