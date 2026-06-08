export class ApiResponse {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  Print() {
    console.log(`success: ${success} | message: ${message} | data: ${data}`);
  }
}
