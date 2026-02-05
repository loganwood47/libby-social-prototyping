import { ChevronRight, X } from "lucide-react";

interface SectionProps {
  title: string;
  subtitle?: string;
  hasArrow?: boolean;
  children: React.ReactNode;
  className?: string;
  textColor?: string;
  showClose?: boolean;
}

export function Section({ title, subtitle, hasArrow = true, children, className = "", textColor = "text-[#D37F2F]", showClose = false }: SectionProps) {
  return (
    <div className={`py-6 pl-5 ${className}`}>
      <div className="pr-5 mb-4">
        <div className="flex items-center justify-between cursor-pointer group">
          <h2 className={`text-lg font-bold ${textColor} tracking-wide line-clamp-1 flex-1`}>
            {title}
          </h2>
          <div className="flex items-center gap-3">
             {hasArrow && !showClose && (
                <div className="bg-[#2A2A2A] rounded-full p-1 group-hover:bg-[#3A3A3A] transition-colors">
                 <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
             )}
             {showClose && (
                <div className="bg-[#2A2A2A] rounded-full p-1 hover:bg-[#3A3A3A] transition-colors">
                    <X className="w-4 h-4 text-gray-400" />
                </div>
             )}
          </div>
        </div>
        {subtitle && (
          <div className="flex items-center justify-between mt-1 cursor-pointer">
             <p className="text-white text-[15px] font-medium leading-snug pr-2">{subtitle}</p>
             {hasArrow && <ChevronRight className="w-5 h-5 text-white shrink-0" />}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
