import type { Request, Response } from 'express';
export declare const createHabit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getHabits: (req: Request, res: Response) => Promise<void>;
export declare const updateHabit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteHabit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const completeHabit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAnalytics: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=habitController.d.ts.map