'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Clock, Upload, FileText, Shield } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Document {
  id: string
  name: string
  type: 'title_deed' | 'land_registry' | 'building_permit' | 'cof' | 'other'
  status: 'pending' | 'verified' | 'rejected'
  uploadDate: string
  verificationDate?: string
}

const documentTypes = [
  { value: 'title_deed', label: 'Title Deed', required: true },
  { value: 'land_registry', label: 'Land Registry Certificate', required: true },
  { value: 'building_permit', label: 'Building Permit', required: false },
  { value: 'cof', label: 'Certificate of Occupancy', required: false },
  { value: 'other', label: 'Other Documents', required: false },
]

const statusConfig = {
  pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Pending Review' },
  verified: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Verified' },
  rejected: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Needs Resubmission' },
}

export function DocumentVerification() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Property_Title_Deed_2024.pdf',
      type: 'title_deed',
      status: 'verified',
      uploadDate: '2024-01-15',
      verificationDate: '2024-01-16',
    },
    {
      id: '2',
      name: 'Land_Registry_Certificate.pdf',
      type: 'land_registry',
      status: 'verified',
      uploadDate: '2024-01-15',
      verificationDate: '2024-01-17',
    },
    {
      id: '3',
      name: 'Building_Permit_2024.pdf',
      type: 'building_permit',
      status: 'pending',
      uploadDate: '2024-01-20',
    },
  ])

  const handleUpload = (type: string) => {
    // Mock upload handler
    console.log('[v0] Uploading document of type:', type)
  }

  const verifiedCount = documents.filter(d => d.status === 'verified').length
  const allVerified = documents.filter(d => {
    const docType = documentTypes.find(dt => dt.value === d.type)
    return docType?.required
  }).every(d => d.status === 'verified')

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-2">
              Legal Document Verification
            </h2>
            <p className="text-muted-foreground">
              Verify property documents to build trust with buyers and renters. All documents are securely processed.
            </p>
          </div>
          {allVerified && (
            <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">All Verified</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Verification Progress</h3>
          <span className="text-2xl font-bold text-primary">{verifiedCount}/{documents.length}</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(verifiedCount / documents.length) * 100}%` }}
          />
        </div>
      </Card>

      {/* Uploaded Documents */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Uploaded Documents</h3>
        <div className="space-y-3">
          {documents.map((doc) => {
            const statusInfo = statusConfig[doc.status]
            const StatusIcon = statusInfo.icon
            return (
              <Card key={doc.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg ${statusInfo.bg}`}>
                      <FileText className={`w-5 h-5 ${statusInfo.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {documentTypes.find(dt => dt.value === doc.type)?.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </p>
                      {doc.verificationDate && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(doc.verificationDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <StatusIcon className={`w-6 h-6 ${statusInfo.color}`} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Upload New Document */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Upload Additional Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentTypes.map((docType) => {
            const hasDocument = documents.some(d => d.type === docType.value)
            return (
              <Card key={docType.value} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{docType.label}</h4>
                    {docType.required && (
                      <p className="text-xs text-amber-600 font-medium mt-1">Required</p>
                    )}
                  </div>
                  {hasDocument && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                </div>
                <Button
                  variant={hasDocument ? 'outline' : 'default'}
                  className="w-full gap-2"
                  onClick={() => handleUpload(docType.value)}
                >
                  <Upload className="w-4 h-4" />
                  {hasDocument ? 'Replace' : 'Upload'} Document
                </Button>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Trust Badge */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Benefits of Legal Verification</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Builds credibility and trust with potential buyers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Speeds up the negotiation and closing process
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Reduces legal disputes and complications
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Shows you&apos;re a professional property seller
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
