export class BaseController {
  async successResponse(data) {
    return {
      status: 'success',
      data,
    };
  }

  async successPaginationResponse(data, filterDto) {
    const [result, total] = data;

    return {
      status: 'success',
      data: {
        items: result,
        totalItems: total,
        totalPages: Math.floor(total / (filterDto.pageSize ?? 10)) + 1,
        currentPage: filterDto.page ?? 1,
      },
    };
  }
}
