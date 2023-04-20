export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			forumlar: {
				Row: {
					admin: string | null;
					created_at: string | null;
					id: number;
					name: string;
					slug: string;
				};
				Insert: {
					admin?: string | null;
					created_at?: string | null;
					id?: number;
					name: string;
					slug: string;
				};
				Update: {
					admin?: string | null;
					created_at?: string | null;
					id?: number;
					name?: string;
					slug?: string;
				};
			};
			kategoriler: {
				Row: {
					created_at: string | null;
					forum: number | null;
					id: number;
					name: string | null;
					owner: string | null;
					slug: string;
				};
				Insert: {
					created_at?: string | null;
					forum?: number | null;
					id?: number;
					name?: string | null;
					owner?: string | null;
					slug: string;
				};
				Update: {
					created_at?: string | null;
					forum?: number | null;
					id?: number;
					name?: string | null;
					owner?: string | null;
					slug?: string;
				};
			};
			konular: {
				Row: {
					author: string | null;
					content: string | null;
					created_at: string | null;
					id: number;
					kategori: number | null;
					slug: string | null;
					title: string | null;
				};
				Insert: {
					author?: string | null;
					content?: string | null;
					created_at?: string | null;
					id?: number;
					kategori?: number | null;
					slug?: string | null;
					title?: string | null;
				};
				Update: {
					author?: string | null;
					content?: string | null;
					created_at?: string | null;
					id?: number;
					kategori?: number | null;
					slug?: string | null;
					title?: string | null;
				};
			};
			yorumlar: {
				Row: {
					author: string | null;
					content: string;
					created_at: string | null;
					id: number;
					konu: number | null;
				};
				Insert: {
					author?: string | null;
					content: string;
					created_at?: string | null;
					id?: number;
					konu?: number | null;
				};
				Update: {
					author?: string | null;
					content?: string;
					created_at?: string | null;
					id?: number;
					konu?: number | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
