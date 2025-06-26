type SortOrder = 'asc' | 'desc';

interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: SortOrder;
  category?: string;
  status?: "pending" | "confirmed" | "canceled";
  minAmount: number,
  maxAmount: number
}

export const buildQueryOptions = (query: QueryOptions, searchableFields: string[] = [ 'title' ]) => {
  const {
    page = 1,
    limit = 10,
    search,
    sortBy = 'createdAt',
    order = 'asc',
    category,
    status,
    minAmount,
    maxAmount
  } = query;

  const filter: any = {};

  if (search && searchableFields.length) {
    filter.$or = searchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    }));
  }

  if (category) {
    filter.category = category;
  }

  if(status){
    filter.status = status;
  }

  if (minAmount !== undefined || maxAmount !== undefined) {
    filter.amount = {};
    if (minAmount !== undefined) filter.amount.$gte = minAmount;
    if (maxAmount !== undefined) filter.amount.$lte = maxAmount;
  }

  const sortOrder = order === 'desc' ? -1 : 1;
  const sort: any = {};
  sort[sortBy] = sortOrder;

  const skip = (page - 1) * limit;

  return {
    filter,
    sort,
    skip,
    limit,
  };
};
