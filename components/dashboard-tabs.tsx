"use client"

import type React from "react"
import { useState } from "react"
import { HelpCircle, Scissors, DollarSign } from "lucide-react"

interface TabButtonProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground ${
        active ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
      }`}
      onClick={onClick}
      data-state={active ? "active" : "inactive"}
    >
      {icon}
      {label}
    </button>
  )
}

type DashboardTabsProps = {}

const DashboardTabs: React.FC<DashboardTabsProps> = () => {
  const [activeTab, setActiveTab] = useState<"faq" | "cut-expenses" | "earn-cash">("faq")

  return (
    <div>
      {/* If there's a separate dashboard-tabs component, update the tab order there as well */}

      {/* Update the tab rendering order: */}
      <div className="flex flex-wrap gap-2">
        <TabButton
          active={activeTab === "faq"}
          onClick={() => setActiveTab("faq")}
          icon={<HelpCircle className="h-4 w-4" />}
          label="FAQ"
        />
        <TabButton
          active={activeTab === "cut-expenses"}
          onClick={() => setActiveTab("cut-expenses")}
          icon={<Scissors className="h-4 w-4" />}
          label="Cut Expenses"
        />
        <TabButton
          active={activeTab === "earn-cash"}
          onClick={() => setActiveTab("earn-cash")}
          icon={<DollarSign className="h-4 w-4" />}
          label="Earn Cash"
        />
        {/* Other tab buttons... */}
      </div>

      {/* Content based on activeTab */}
      {activeTab === "faq" && <div>FAQ Content</div>}
      {activeTab === "cut-expenses" && <div>Cut Expenses Content</div>}
      {activeTab === "earn-cash" && <div>Earn Cash Content</div>}
    </div>
  )
}

export default DashboardTabs
