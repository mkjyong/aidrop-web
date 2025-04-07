"use client";

import Link from "next/link";
import { Droplets, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">AiDrop</span>
            </div>
            <p className="text-gray-600 text-sm">
              AI 기반 온체인 데이터 분석을 통해 더 나은 에어드랍과 마케팅을 제공합니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">링크</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-blue-600 text-sm">
                  특징
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-gray-600 hover:text-blue-600 text-sm">
                  프로세스
                </Link>
              </li>
              <li>
                <Link href="#submit" className="text-gray-600 hover:text-blue-600 text-sm">
                  참여하기
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">커뮤니티</h3>
            <div className="flex space-x-4">
              <a 
                href="https://x.com/aidrop_official?s=21" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AiDrop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 