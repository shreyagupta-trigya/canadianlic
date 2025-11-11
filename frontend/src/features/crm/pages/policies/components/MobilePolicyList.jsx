import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobilePolicyList = ({ policies, selectedTableLayout }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600';
      case 'inactive':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
  };

  return (
    <div className="mobile-policy-list">
      {policies.map((policy) => (
        <Card key={policy.ROWID} className="mb-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{policy.policyName || 'Unnamed Policy'}</CardTitle>
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${getStatusColor(policy.policyStatus)}`}>
                {policy.policyStatus}
              </span>
              <div className="flex gap-1">
                <Link to={`/policy-details/${policy.ROWID}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to={`/policy-edit/${policy.ROWID}`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Client:</span>
                <span className="text-sm font-medium">{policy.clinetName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Policy Type:</span>
                <span className="text-sm">{policy.policyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Premium:</span>
                <span className="text-sm">{formatCurrency(policy.policyPremiumReadI)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Start Date:</span>
                <span className="text-sm">{formatDate(policy.policyStartDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Renewal Date:</span>
                <span className="text-sm">{formatDate(policy.policyRenewalDate)}</span>
              </div>
              {selectedTableLayout === 'all' && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Layout:</span>
                  <span className="text-sm">{policy.layout}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MobilePolicyList;
