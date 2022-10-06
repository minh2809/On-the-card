1. Điểm Tốt:

   - Phân chia layout:
     +, Minh Đã Nhóm được các phần chính của trang web trong những <div> element. Code đã rõ những phần chính như:
     <!-- Thanh công cụ -->
     <!-- Trang chủ cá nhân -->
     <!-- Highlights -->

   .options
   <!-- Ảnh -->

   - Tìm kiếm thông tin và Resources:
     +, Minh đã tìm được các icon dạng svg cho những icon trong trang web
     +, Minh tìm được phần icon search trong search bar: &#xF002;

     +, Minh nên chia sẻ cách Minh tìm được những icon và cho vào code của mình
     trong buổi gặp mặt tiếp theo

   - Hoàn thành những việc cơ bản:
     +, Minh đã hoàn thiện project đúng với design đến 99% trên máy desktop
     +, Minh đã có sự chú ý trong chi tiết khá tốt trong project
     +, Minh đã sử dụng khá thành thạo những kiến thức cơ bản đã học về HTML và CSS.

   Trong đó bao gồm:
   -> Cách dùng HTML và CSS
   -> Kiến thức về Box Model
   -> CSS Grid và Flex
   -> CSS Variables và Basic of CSS Animation

2. Điểm Cần Cải Thiện:

   - Tránh dùng giá trị âm cho một số property:
     +, Em nên tránh dùng giá trị âm cho những property của margin và padding: margin-top, margin-bottom, padding-top, padding-left, etc.
     +, ở code của em anh không thấy dùng giá trị âm cho padding nhưng có giá trị âm cho margin
     +, nên tìm cách để tránh dùng giá trị âm

   => Lý do: vì dùng giá trị âm các phần tử sẽ hiển thị rất khó đoán
   khi đổi thiết bị

   Giá trị dương cho những properties của margin và padding có thể được dùng

   - Ở phần <!-- Trang chủ cá nhân -->:
     +, Em nên style grid hoặc flex cho class="information"
     +, class post5, post6, post7 giống hệt nhau, class post4 cũng khá giống 3 class còn lại
     em nên chỉ dùng 1 class, như thế code CSS sẽ ngắn hơn và dễ quản lý hơn

     => có 1 nguyên tắc trong lập trình là: DRY (Don't Repeat Yourself), mình không nên repeat những
     code mình đã từng viết trong 1 file

   - Ở phần <!-- Highlights -->:
     +, Cũng như ở trên, theo nguyên tắc DRY, em nên tìm cách viết 1 class chung cho
     cách classes sau đây: how, tap-me, one-house, why, review vì các classes này khá giống nhau

     +, Em không nên dùng nhiều <br /> để cách dòng, thay vào đó em có thể dùng margin-bottom

   - Ở phần bên trong <div class="options">:
     +, Cũng như ở trên, theo nguyên tắc DRY, em nên tìm cách viết 1 class chung cho
     cách classes sau đây: post-minh, guide, reel, video, tag vì các classes này khá giống nhau

   - Responsive:
     +, Thiếu phần styling cho phone: @media screen and (max-width: 600px) { }
     +, Em nên theo Media Breakpoints anh đã chỉ cho media query, xem lại ở link này nhé:

     https://github.com/Trung28899/OTC-INTERNS/tree/main/Week5

3. Thông tin về Nguyên Tắc DRY:

   - DRY (Don’t Repeat Yourself) is a principle of software development. The focus of DRY is to avoid repetition of information.

   - Why?
     When you write code that performs the same tasks over and over again, any modification of one task requires the same change
     to be made to every single instance of that task! Editing every instance of a task is a lot of work.

   - Source: https://www.earthdatascience.org/courses/earth-analytics/automate-science-workflows/write-efficient-code-for-science-r/
